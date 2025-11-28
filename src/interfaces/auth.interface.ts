export interface IJwtPayload {
	userId: string;
	email: string;
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
