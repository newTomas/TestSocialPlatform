export interface IUser {
	id: string;
	name: string;
}

export interface IUsers {
	cursor?: string | undefined;
	users: IUser[];
}
