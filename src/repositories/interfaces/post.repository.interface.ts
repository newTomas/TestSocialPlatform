import { GetAllPostsDto } from "../../dtos/GetAllPosts.dto.js";
import { IPost, IPosts } from "../../interfaces/post.interface.js";

export interface IPostRepository {
  create(userId: string, text: string): Promise<IPost>;
  get(id: string): Promise<IPost | null>;
  getAll(dto: GetAllPostsDto): Promise<IPosts>;
  edit(userId: string, id: string, text: string): Promise<IPost | null>;
  delete(userId: string, id: string): Promise<boolean>;
}
