import { PostEntity } from "../domain/post.entity.js";

export interface IPosts {
	cursor: string | null;
	posts: PostEntity[];
}
