import bcrypt from 'bcryptjs';
import { jwtConfig } from '../config/index.js';
import { User } from '../generated/prisma/client.js';

export class UserEntity {
	private constructor(private readonly props: User) { }

	public static fromDto(data: User): UserEntity {
		return new UserEntity(data);
	}

	public async setPassword(plainPassword: string) {
		this.props.password = await bcrypt.hash(plainPassword, jwtConfig.saltRounds);
	}

	public async checkPassword(plainPassword: string) {
		return await bcrypt.compare(plainPassword, this.props.password);
	}

	public getSnapshot(): User {
		return { ...this.props };
	}

	public get id() {
		return this.props.id;
	}
}
