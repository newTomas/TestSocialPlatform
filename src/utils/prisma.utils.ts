import { databaseConfig } from "src/config/index.js";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
	connectionLimit: databaseConfig.connections
});

export default new PrismaClient({ adapter });
