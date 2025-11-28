import { PrismaClient, RefreshToken } from '../../generated/prisma/client.js';
import { ITokenRepository } from '../interfaces/token.repository.interface.js';

export class PrismaTokenRepository implements ITokenRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(userId: string, token: string, expiresAt: Date): Promise<RefreshToken> {
    return this.prisma.refreshToken.create({
      data: {
        userId,
        token,
        expiredAt: expiresAt,
      },
    });
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return this.prisma.refreshToken.findFirst({
      where: { token },
    });
  }

  async deleteById(id: bigint): Promise<void> {
    await this.prisma.refreshToken.delete({
      where: { id },
    });
  }

  async deleteAllByUserId(userId: string): Promise<void> {
    await this.prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }
}
