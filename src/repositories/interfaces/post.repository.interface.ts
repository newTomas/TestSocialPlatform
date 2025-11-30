import { PostEntity } from "../../domain/post.entity.js";
import { GetAllPostsDto } from "../../dtos/Post.dto.js";
import { TTransactionClient } from "../../interfaces/database.interface.js";
import { IPosts } from "../../interfaces/post.interface.js";

export interface IPostRepository {
  create(userId: string, text: string, tx?: TTransactionClient): Promise<PostEntity>;
  get(id: string, tx?: TTransactionClient): Promise<PostEntity | null>;
  getAll(dto: GetAllPostsDto, tx?: TTransactionClient): Promise<IPosts>;
  save(post: PostEntity, tx?: TTransactionClient): Promise<PostEntity | null>;
}
