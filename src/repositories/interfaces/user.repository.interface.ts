import { UserEntity } from '../../domain/user.entity.js';
import { CreateUserDto } from '../../dtos/Auth.dto.js';
import { GetAllUsersDto } from '../../dtos/User.dto.js';
import { TTransactionClient } from '../../interfaces/database.interface.js';
import { IUsers } from '../../interfaces/user.interface.js';

export interface IUserRepository {
  create(data: CreateUserDto & { passwordHash: string }, tx?: TTransactionClient): Promise<UserEntity>;
  findByEmail(email: string, tx?: TTransactionClient): Promise<UserEntity | null>;
  findById(id: string, tx?: TTransactionClient): Promise<UserEntity | null>;
  getAll(dto: GetAllUsersDto, tx?: TTransactionClient): Promise<IUsers>;
}
