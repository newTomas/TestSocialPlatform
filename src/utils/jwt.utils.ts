import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/index.js";
import { IJwtPayload } from "../interfaces/auth.interface.js";

export function signNewTokens(payload: IJwtPayload) {
	const accessToken = jwt.sign(
		payload,
		jwtConfig.accessSecret,
		{ expiresIn: jwtConfig.accessExpiresIn }
	);

	const refreshToken = jwt.sign(
		payload,
		jwtConfig.refreshSecret,
		{ expiresIn: jwtConfig.refreshExpiresIn }
	);

	return { accessToken, refreshToken };
};

export function verifyRefreshToken(token: string) {
	try {
		const payload = jwt.verify(token, jwtConfig.refreshSecret) as IJwtPayload;
		return payload;
	} catch (error) {
		throw new Error('Invalid or expired refresh token signature.');
	}
};
