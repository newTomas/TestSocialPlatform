import bcrypt from 'bcryptjs';
import { jwtConfig } from '../config/index.js';
import { IUserRepository } from '../repositories/interfaces/user.repository.interface.js';
import { ITokenRepository } from '../repositories/interfaces/token.repository.interface.js'; // Предположим, он есть
import { CreateUserDto } from '../dtos/CreateUser.dto.js';
import { LoginUserDto } from '../dtos/LoginUser.dto.js';
import { IJwtPayload, IAuthResponse } from '../interfaces/auth.interface.js';
import { signNewTokens, verifyRefreshToken } from '../utils/jwt.utils.js';
import { User } from '../generated/prisma/client.js';
import { IDatabaseService, TTransactionClient } from '../interfaces/database.interface.js';

export class AuthService {
	constructor(
		private readonly userRepo: IUserRepository,
		private readonly tokenRepo: ITokenRepository,
		private readonly dbService: IDatabaseService,
	) { }

	async register(dto: CreateUserDto): Promise<IAuthResponse> {
		const existing = await this.userRepo.findByEmail(dto.email);
		if (existing) throw new Error('User already exists');

		const passwordHash = await bcrypt.hash(dto.password, jwtConfig.saltRounds);

		const tokens = this.dbService.runInTransaction(async tx => {
			const user = await this.userRepo.create({ ...dto, passwordHash }, tx);

			return this.generateTokens(user, tx);
		});

		return tokens;
	}

	async login(dto: LoginUserDto): Promise<IAuthResponse> {
		const user = await this.userRepo.findByEmail(dto.email);
		if (!user) throw new Error('Invalid credentials');

		const isValid = await bcrypt.compare(dto.password, user.password);
		if (!isValid) throw new Error('Invalid credentials');

		return this.generateTokens(user);
	}

	private async generateTokens(user: User, tx?: TTransactionClient): Promise<IAuthResponse> {

		const payload: IJwtPayload = { userId: user.id, email: user.email };

		const tokens = signNewTokens(payload);

		const refreshDurationMs = jwtConfig.refreshExpiresIn * 1000;
		const expiresAt = new Date(Date.now() + refreshDurationMs);

		await this.tokenRepo.save(user.id, tokens.refreshToken, expiresAt, tx);

		return {
			user: { id: user.id, email: user.email, name: user.name },
			accessToken: tokens.accessToken,
			refreshToken: tokens.refreshToken,
		};
	}

	public async refresh(refreshToken: string): Promise<IAuthResponse> {
		if (!refreshToken) {
			throw new Error('Refresh token is required.');
		}

		let payload: IJwtPayload;
		try {
			payload = verifyRefreshToken(refreshToken);
		} catch (e) {
			throw new Error('Invalid refresh token.');
		}

		const savedToken = await this.tokenRepo.findByToken(refreshToken);

		if (!savedToken) {
			throw new Error('Refresh token not found or revoked.');
		}

		if (savedToken.expiredAt < new Date()) {
			await this.tokenRepo.deleteById(savedToken.id);
			throw new Error('Refresh token expired.');
		}

		const user = await this.userRepo.findById(payload.userId);
		if (!user) {
			throw new Error('User not found.');
		}

		return this.dbService.runInTransaction(async tx => {
			await this.tokenRepo.deleteById(savedToken.id, tx);

			return this.generateTokens(user, tx);
		});
	}
}
