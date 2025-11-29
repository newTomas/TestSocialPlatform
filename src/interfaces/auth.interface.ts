export interface IJwtPayload {
	userId: string;
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
