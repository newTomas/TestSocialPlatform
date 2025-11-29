import { RefreshToken } from '../../generated/prisma/client.js';
import { TTransactionClient } from '../../interfaces/database.interface.js';

export interface ITokenRepository {
  save(userId: string, token: string, expiresAt: Date, tx?: TTransactionClient): Promise<RefreshToken>;
  findByToken(token: string, tx?: TTransactionClient): Promise<RefreshToken | null>;
  deleteById(id: bigint, tx?: TTransactionClient): Promise<void>;
  deleteAllByUserId(userId: string, tx?: TTransactionClient): Promise<void>;
}
