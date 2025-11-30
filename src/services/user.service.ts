import { IUsers } from '../interfaces/user.interface.js';
import { GetAllUsersDto, GetUserDto } from '../dtos/User.dto.js';
import { IUserRepository } from '../repositories/interfaces/user.repository.interface.js';
import { UserEntity } from '../domain/user.entity.js';

export class UserService {
	constructor(
		private readonly userRepo: IUserRepository
	) { }

	async GetUser(dto: GetUserDto): Promise<UserEntity | null> {
		const user = await this.userRepo.findById(dto.id);

		return user;
	}

	async GetAllUsers(dto: GetAllUsersDto): Promise<IUsers> {
		const users = await this.userRepo.getAll(dto);

		return users;
	}
}
