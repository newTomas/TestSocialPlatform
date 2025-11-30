import { UserEntity } from "../domain/user.entity.js";
import { UserResponseDto } from "../dtos/User.dto.js";

export class UserMapper {
	public static toResponseDto(entity: UserEntity): UserResponseDto {
		const data = entity.getSnapshot();

		return {
			id: data.id,
			name: data.name,
			createdAt: data.createdAt,
		};
	}
}
