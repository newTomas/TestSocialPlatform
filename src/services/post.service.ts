import { IPosts } from '../interfaces/post.interface.js';
import { CreatePostDto, GetPostDto, GetAllPostsDto, EditPostDto, DeletePostDto } from '../dtos/Post.dto.js';
import { IPostRepository } from '../repositories/interfaces/post.repository.interface.js';
import { PostEntity } from '../domain/post.entity.js';
import { IJwtPayload } from '../interfaces/auth.interface.js';

export class PostService {
	constructor(
		private readonly postRepo: IPostRepository
	) { }

	async GetPost(dto: GetPostDto): Promise<PostEntity | null> {
		const post = await this.postRepo.get(dto.id);

		if (!post) return null;

		return post;
	}

	async GetAllPosts(dto: GetAllPostsDto): Promise<IPosts> {
		const posts = await this.postRepo.getAll(dto);

		return posts;
	}

	async CreatePost(user: IJwtPayload, dto: CreatePostDto): Promise<PostEntity> {
		const post = await this.postRepo.create(user.userId, dto.text);

		return post;
	}

	async EditPost(user: IJwtPayload, dto: EditPostDto): Promise<PostEntity | null> {
		const existPost = await this.postRepo.get(dto.id);

		if (!existPost) return null;

		existPost.updateText(dto.text, user);

		const post = await this.postRepo.save(existPost);

		return post;
	}

	async DeletePost(user: IJwtPayload, dto: DeletePostDto): Promise<PostEntity | null> {
		const existPost = await this.postRepo.get(dto.id);

		if (!existPost) return null;

		existPost.delete(user);

		const post = await this.postRepo.save(existPost);

		return post;
	}
}
