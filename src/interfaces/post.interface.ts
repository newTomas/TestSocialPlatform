export interface IPost {
	id: string;
	userId: string;
	text: string;
  createdAt: Date;
}

export interface IPosts {
	cursor?: string | undefined;
	posts: IPost[];
}
