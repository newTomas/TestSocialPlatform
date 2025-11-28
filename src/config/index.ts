import env from "../utils/env.utils.js";

export const jwtConfig = {
	accessSecret: env.JWT_ACCESS_SECRET,
	refreshSecret: env.JWT_REFRESH_SECRET,
	accessExpiresIn: env.JWT_EXPIRATION,
	refreshExpiresIn: env.JWT_REFRESH_EXPIRATION,
	saltRounds: env.SALT_ROUNDS,
}

export const serverConfig = {
	port: env.PORT,
}

export const databaseConfig = {
	databaseUrl: env.DATABASE_URL,
}
