import { IPost } from 'src/interfaces/post.interface.js';
import { CreatePostDto } from 'src/dtos/CreatePost.dto.js';
import { IPostRepository } from 'src/repositories/interfaces/post.repository.interface.js';

export class PostService {
	constructor(
		private readonly postRepo: IPostRepository
	) { }

	async CreatePost(userId: bigint, dto: CreatePostDto): Promise<IPost> {
		const post = await this.postRepo.create(userId, dto.text);

		return post;
	}
}
