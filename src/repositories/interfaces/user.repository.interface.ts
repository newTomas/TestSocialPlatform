import { User } from '../../generated/prisma/client.js';
import { CreateUserDto } from '../../dtos/CreateUser.dto.js';

export interface IUserRepository {
  create(data: CreateUserDto & { passwordHash: string }): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: bigint): Promise<User | null>;
}
