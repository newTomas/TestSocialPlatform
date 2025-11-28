import { RefreshToken } from '../../generated/prisma/client.js';

export interface ITokenRepository {
  save(userId: string, token: string, expiresAt: Date): Promise<RefreshToken>;
  findByToken(token: string): Promise<RefreshToken | null>;
  deleteById(id: bigint): Promise<void>;
  deleteAllByUserId(userId: string): Promise<void>;
}
