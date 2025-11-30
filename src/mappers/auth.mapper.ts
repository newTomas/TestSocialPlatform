import { AuthResponseDto } from "../dtos/Auth.dto.js";
import { AuthDomainResult } from "../interfaces/auth.interface.js";
import { UserMapper } from "./user.mapper.js";

export class RefreshTokenMapper {
	public static toResponseDto(data: AuthDomainResult): AuthResponseDto {
		return {
			user: UserMapper.toResponseDto(data.user),
			accessToken: data.accessToken,
			refreshToken: data.refreshToken.getSnapshot().token,
		};
	}
}
