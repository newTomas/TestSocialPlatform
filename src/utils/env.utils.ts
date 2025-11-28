import "dotenv/config";
import { envSchema } from "env-schema";
import { Static, Type } from "@sinclair/typebox";

const schema = Type.Object({
	// === JWT CONFIG ===
	JWT_ACCESS_SECRET: Type.String(),
	JWT_REFRESH_SECRET: Type.String(),
	JWT_EXPIRATION: Type.Number({ default: 3600 }),
	JWT_REFRESH_EXPIRATION: Type.Number({ default: 86400 }),
	SALT_ROUNDS: Type.Number({ default: 10 }),

	// === SERVER CONFIG ===
	PORT: Type.Number({ default: 3000 }),

	// === DATABASE CONFIG ===
	DATABASE_URL: Type.String(),
	DATABASE_CONNECTIONS: Type.Number({ default: 5 }),
}, {
	additionalProperties: true
});

export default envSchema<Static<typeof schema>>({ schema });
