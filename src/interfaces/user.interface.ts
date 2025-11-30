import { UserEntity } from "../domain/user.entity.js";

export interface IUsers {
	cursor: string | null;
	users: UserEntity[];
}
