import { User } from '../../generated/prisma/client.js';
import { CreateUserDto } from '../../dtos/Auth.dto.js';
import { GetAllUsersDto } from '../../dtos/User.dto.js';
import { IUsers } from '../../interfaces/user.interface.js';
import { TTransactionClient } from '../../interfaces/database.interface.js';

export interface IUserRepository {
  create(data: CreateUserDto & { passwordHash: string }, tx?: TTransactionClient): Promise<User>;
  findByEmail(email: string, tx?: TTransactionClient): Promise<User | null>;
  findById(id: string, tx?: TTransactionClient): Promise<User | null>;
  getAll(dto: GetAllUsersDto, tx?: TTransactionClient): Promise<IUsers>;
}
