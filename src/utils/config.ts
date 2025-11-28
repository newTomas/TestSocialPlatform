import "dotenv/config";
import { envSchema } from "env-schema";
import { Static, Type } from "@sinclair/typebox";

const schema = Type.Object({
	JWT_SECRET: Type.String(),
	JWT_EXPIRATION: Type.Number({ default: 3600 }),
	JWT_REFRESH_EXPIRATION: Type.Number({ default: 86400 }),
}, {
	additionalProperties: true
});

export default envSchema<Static<typeof schema>>({ schema });
