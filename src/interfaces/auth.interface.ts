import { RefreshTokenEntity } from "../domain/refreshToken.entity.js";
import { UserEntity } from "../domain/user.entity.js";

export interface IJwtPayload {
  userId: string;
}

export function isIJwtPayload(data: unknown): data is IJwtPayload {
  if (typeof data !== 'object') return false;

  return typeof (data as IJwtPayload).userId == "string";
}

export interface AuthDomainResult {
  user: UserEntity;
  accessToken: string;
  refreshToken: RefreshTokenEntity;
}
