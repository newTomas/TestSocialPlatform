import { User } from '../../generated/prisma/client.js';
import { CreateUserDto } from '../../dtos/CreateUser.dto.js';
import { GetAllUsersDto } from '../../dtos/GetAllUsers.dto.js';
import { IUsers } from '../../interfaces/user.interface.js';

export interface IUserRepository {
  create(data: CreateUserDto & { passwordHash: string }): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  getAll(dto: GetAllUsersDto): Promise<IUsers>;
}
