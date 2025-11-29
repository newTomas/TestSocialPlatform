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

		if (!post) return null;

		return {
			id: post.id,
			userId: post.userId,
			text: post.text,
			createdAt: post.createdAt,
		};
	}

	async GetAllPosts(dto: GetAllPostsDto): Promise<IPosts> {
		const post = await this.postRepo.getAll(dto);

		return {
			cursor: post.cursor,
			posts: post.posts.map(post => ({
				id: post.id,
				userId: post.userId,
				text: post.text,
				createdAt: post.createdAt,
			})),
		};
	}

	async CreatePost(userId: string, dto: CreatePostDto): Promise<IPost> {
		const post = await this.postRepo.create(userId, dto.text);

		return {
			id: post.id,
			userId: post.userId,
			text: post.text,
			createdAt: post.createdAt,
		};
	}

	async EditPost(userId: string, dto: EditPostDto): Promise<IPost | null> {
		const existPost = await this.postRepo.get(dto.id);

		if(!existPost) return null;

		if(existPost.userId != userId) {
			throw new Error(`The post can only be edited by the author!`);
		}

		const post = await this.postRepo.edit(userId, dto.id, dto.text);

		if (!post) return null;

		return {
			id: post.id,
			userId: post.userId,
			text: post.text,
			createdAt: post.createdAt,
		};
	}

	async DeletePost(userId: string, dto: DeletePostDto): Promise<boolean> {
		const existPost = await this.postRepo.get(dto.id);

		if(!existPost) return false;

		if(existPost.userId != userId) {
			throw new Error(`The post can only be deleted by the author!`);
		}

		const deleted = await this.postRepo.delete(userId, dto.id);

		return deleted;
	}
}
