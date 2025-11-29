import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/index.js";
import { IJwtPayload, isIJwtPayload } from "../interfaces/auth.interface.js";

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

export function verifyRefreshToken(token: string): IJwtPayload {
	try {
		const payload = jwt.verify(token, jwtConfig.refreshSecret);
		if (!isIJwtPayload(payload)) {
			throw new Error(`Invalid or expired refresh token signature.`);
		}
		return payload;
	} catch (error) {
		throw new Error('Invalid or expired refresh token signature.');
	}
};

export function verifyAccessToken(token: string): IJwtPayload {
	try {
		const payload = jwt.verify(token, jwtConfig.accessSecret);
		if (!isIJwtPayload(payload)) {
			throw new Error(`Access token is invalid or expired.`);
		}
		return payload;
	} catch (error) {
		throw new Error('Access token is invalid or expired.');
	}
};
