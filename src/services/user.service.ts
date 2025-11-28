import { IUser, IUsers } from '../interfaces/user.interface.js';
import { GetAllUsersDto } from '../dtos/GetAllUsers.dto.js';
import { GetUserDto } from '../dtos/GetUser.dto.js';
import { IUserRepository } from '../repositories/interfaces/user.repository.interface.js';

export class UserService {
	constructor(
		private readonly userRepo: IUserRepository
	) { }

	async GetUser(dto: GetUserDto): Promise<IUser | null> {
		const user = await this.userRepo.findById(dto.id);

		return user;
	}

	async GetAllUsers(dto: GetAllUsersDto): Promise<IUsers> {
		const users = await this.userRepo.getAll(dto);

		return users;
	}
}
