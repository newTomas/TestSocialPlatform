import { PrismaClient, User } from '../../generated/prisma/client.js';
import { IUserRepository } from '../interfaces/user.repository.interface.js';
import { GetAllUsersDto } from '../../dtos/User.dto.js';
import { IUsers } from '../../interfaces/user.interface.js';
import { UserFindManyArgs } from '../../generated/prisma/models.js';
import { TTransactionClient } from '../../interfaces/database.interface.js';
import { CreateUserDto } from '../../dtos/Auth.dto.js';

export class PrismaUserRepository implements IUserRepository {
	constructor(private readonly prisma: PrismaClient) { }

	private getClient(tx?: TTransactionClient): PrismaClient {
		return tx ?? this.prisma;
	}

	async create(data: CreateUserDto & { passwordHash: string }, tx?: TTransactionClient): Promise<User> {
		return this.getClient(tx).user.create({
			data: {
				email: data.email,
				name: data.name,
				password: data.passwordHash,
			},
		});
	}

	async findByEmail(email: string, tx?: TTransactionClient): Promise<User | null> {
		return this.getClient(tx).user.findUnique({ where: { email } });
	}

	async findById(id: string, tx?: TTransactionClient): Promise<User | null> {
		return this.getClient(tx).user.findUnique({ where: { id } });
	}

	async getAll(dto: GetAllUsersDto, tx?: TTransactionClient): Promise<IUsers> {
		let args: UserFindManyArgs = {
			orderBy: {
				id: "desc",
			},
			take: dto.limit,
		};

		if (dto.cursor) {
			args.cursor = {
				id: dto.cursor
			}
		}

		const users = await this.getClient(tx).user.findMany(args);

		return {
			cursor: users.at(-1)?.id,
			users,
		}
	}
}
