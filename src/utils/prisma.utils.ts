import { databaseConfig } from "../config/index.js";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb(databaseConfig.databaseUrl);

export default new PrismaClient({ adapter });
