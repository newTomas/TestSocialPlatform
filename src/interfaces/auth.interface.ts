export interface IJwtPayload {
  userId: string;
}

export function isIJwtPayload(data: unknown): data is IJwtPayload {
  if (typeof data !== 'object') return false;

  return typeof (data as IJwtPayload).userId == "string";
}

export interface IAuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}
