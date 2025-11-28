import express from "express";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const app = express();

const port = 3000;

const adapter = new PrismaMariaDb({
	connectionLimit: 5
});

const prisma = new PrismaClient({ adapter });

app.listen(port, () => {
	console.log(`App listening on port ${port}`)
});
