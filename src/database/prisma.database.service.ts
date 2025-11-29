import { PrismaClient } from '../generated/prisma/client.js';
import { IDatabaseService, TTransactionClient } from '../interfaces/database.interface.js';

export class PrismaDatabaseService implements IDatabaseService {
	constructor(private readonly prisma: PrismaClient) { }

	public async runInTransaction<T>(
		callback: (tx: TTransactionClient) => Promise<T>
	): Promise<T> {
		return this.prisma.$transaction(async (tx) => {
			return callback(tx as TTransactionClient);
		});
	}
}
