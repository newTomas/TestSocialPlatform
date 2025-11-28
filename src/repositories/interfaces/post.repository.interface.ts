import { IPost } from "src/interfaces/post.interface.js";

export interface IPostRepository {
  create(userId: bigint, text: string): Promise<IPost>;
}
