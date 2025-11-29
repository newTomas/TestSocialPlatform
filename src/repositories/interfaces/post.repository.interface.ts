import { GetAllPostsDto } from "../../dtos/Post.dto.js";
import { TTransactionClient } from "../../interfaces/database.interface.js";
import { IPost, IPosts } from "../../interfaces/post.interface.js";

export interface IPostRepository {
  create(userId: string, text: string, tx?: TTransactionClient): Promise<IPost>;
  get(id: string, tx?: TTransactionClient): Promise<IPost | null>;
  getAll(dto: GetAllPostsDto, tx?: TTransactionClient): Promise<IPosts>;
  edit(userId: string, id: string, text: string, tx?: TTransactionClient): Promise<IPost | null>;
  delete(userId: string, id: string, tx?: TTransactionClient): Promise<boolean>;
}
