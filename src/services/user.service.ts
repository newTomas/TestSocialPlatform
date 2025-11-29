import { IUser, IUsers } from '../interfaces/user.interface.js';
import { GetAllUsersDto, GetUserDto } from '../dtos/User.dto.js';
import { IUserRepository } from '../repositories/interfaces/user.repository.interface.js';

export class UserService {
	constructor(
		private readonly userRepo: IUserRepository
	) { }

	async GetUser(dto: GetUserDto): Promise<IUser | null> {
		const user = await this.userRepo.findById(dto.id);

		if (!user) return null;

		return {
			id: user.id,
			name: user.name,
		};
	}

	async GetAllUsers(dto: GetAllUsersDto): Promise<IUsers> {
		const users = await this.userRepo.getAll(dto);

		return {
			cursor: users.cursor,
			users: users.users.map(user => ({
				id: user.id,
				name: user.name,
			}))
		};
	}
}
