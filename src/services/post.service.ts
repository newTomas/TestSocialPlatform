import { IPost, IPosts } from '../interfaces/post.interface.js';
import { CreatePostDto } from '../dtos/CreatePost.dto.js';
import { IPostRepository } from '../repositories/interfaces/post.repository.interface.js';
import { GetPostDto } from '../dtos/GetPost.dto.js';
import { GetAllPostsDto } from '../dtos/GetAllPosts.dto.js';
import { EditPostDto } from '../dtos/EditPost.dto.js';
import { DeletePostDto } from '../dtos/DeletePost.dto.js';

export class PostService {
	constructor(
		private readonly postRepo: IPostRepository
	) { }

	async GetPost(dto: GetPostDto): Promise<IPost | null> {
		const post = await this.postRepo.get(dto.id);

		return post;
	}

	async GetAllPosts(dto: GetAllPostsDto): Promise<IPosts> {
		const post = await this.postRepo.getAll(dto);

		return post;
	}

	async CreatePost(userId: string, dto: CreatePostDto): Promise<IPost> {
		const post = await this.postRepo.create(userId, dto.text);

		return post;
	}

	async EditPost(userId: string, dto: EditPostDto): Promise<IPost | null> {
		const post = await this.postRepo.edit(userId, dto.id, dto.text);

		return post;
	}

	async DeletePost(userId: string, dto: DeletePostDto): Promise<boolean> {
		const post = await this.postRepo.delete(userId, dto.id);

		return post;
	}
}
