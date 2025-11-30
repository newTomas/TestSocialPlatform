import { RefreshTokenEntity } from '../../domain/refreshToken.entity.js';
import { PrismaClient } from '../../generated/prisma/client.js';
import { TTransactionClient } from '../../interfaces/database.interface.js';
import { ITokenRepository } from '../interfaces/token.repository.interface.js';

export class PrismaTokenRepository implements ITokenRepository {
  constructor(private readonly prisma: PrismaClient) { }

  private getClient(tx?: TTransactionClient): PrismaClient {
    return tx ?? this.prisma;
  }

  async save(userId: string, token: string, expiresAt: Date, tx?: TTransactionClient): Promise<RefreshTokenEntity> {
    const refreshToken = await this.getClient(tx).refreshToken.create({
      data: {
        userId,
        token,
        expiredAt: expiresAt,
      },
    });

    return RefreshTokenEntity.fromDto(refreshToken);
  }

  async findByToken(token: string, tx?: TTransactionClient): Promise<RefreshTokenEntity | null> {
    const refreshToken = await this.getClient(tx).refreshToken.findUnique({
      where: { token },
    });

    if (!refreshToken) return null;

    return RefreshTokenEntity.fromDto(refreshToken);
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
