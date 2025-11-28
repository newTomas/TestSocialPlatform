import { PrismaClient, User } from '../../generated/prisma/client.js';
import { IUserRepository } from '../interfaces/user.repository.interface.js';
import { CreateUserDto } from '../../dtos/CreateUser.dto.js';

export class PrismaUserRepository implements IUserRepository {
	constructor(private readonly prisma: PrismaClient) { }

	async create(data: CreateUserDto & { passwordHash: string }): Promise<User> {
		return this.prisma.user.create({
			data: {
				email: data.email,
				name: data.name,
				password: data.passwordHash,
			},
		});
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { email } });
	}

	async findById(id: bigint): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { id } });
	}
}
