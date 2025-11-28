import { PrismaClient, User } from '../../generated/prisma/client.js';
import { IUserRepository } from '../interfaces/user.repository.interface.js';
import { CreateUserDto } from '../../dtos/CreateUser.dto.js';
import { GetAllUsersDto } from '../../dtos/GetAllUsers.dto.js';
import { IUsers } from '../../interfaces/user.interface.js';
import { UserFindManyArgs } from '../../generated/prisma/models.js';

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

	async findById(id: string): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { id } });
	}

	async getAll(dto: GetAllUsersDto): Promise<IUsers> {
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
	
			const posts = await this.prisma.user.findMany(args);
	
			return {
				cursor: posts.at(-1)?.id,
				posts: posts,
			}
	}
}
