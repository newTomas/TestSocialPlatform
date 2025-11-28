export interface IJwtPayload {
	userId: bigint;
	email: string;
}

export interface IAuthResponse {
  user: {
    id: bigint;
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}
