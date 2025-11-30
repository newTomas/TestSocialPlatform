import { PostEntity } from "../domain/post.entity.js";
import { PostResponseDto } from "../dtos/Post.dto.js";

export class PostMapper {
	public static toResponseDto(entity: PostEntity): PostResponseDto {
		const data = entity.getSnapshot();

		return {
			id: data.id,
			userId: data.userId,
			text: data.text,
			createdAt: data.createdAt,
			updatedAt: data.updatedAt,
		};
	}
}
