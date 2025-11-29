import { PrismaClient, RefreshToken } from '../../generated/prisma/client.js';
import { TTransactionClient } from '../../interfaces/database.interface.js';
import { ITokenRepository } from '../interfaces/token.repository.interface.js';

export class PrismaTokenRepository implements ITokenRepository {
  constructor(private readonly prisma: PrismaClient) {}

	private getClient(tx?: TTransactionClient): PrismaClient {
		return tx ?? this.prisma;
	}

  async save(userId: string, token: string, expiresAt: Date, tx?: TTransactionClient): Promise<RefreshToken> {
    return this.getClient(tx).refreshToken.create({
      data: {
        userId,
        token,
        expiredAt: expiresAt,
      },
    });
  }

  async findByToken(token: string, tx?: TTransactionClient): Promise<RefreshToken | null> {
    return this.getClient(tx).refreshToken.findUnique({
      where: { token },
    });
  }

  async deleteById(id: bigint, tx?: TTransactionClient): Promise<void> {
    await this.getClient(tx).refreshToken.delete({
      where: { id },
    });
  }

  async deleteAllByUserId(userId: string, tx?: TTransactionClient): Promise<void> {
    await this.getClient(tx).refreshToken.deleteMany({
      where: { userId },
    });
  }
}
