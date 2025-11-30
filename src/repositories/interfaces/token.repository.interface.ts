import { RefreshTokenEntity } from '../../domain/refreshToken.entity.js';
import { TTransactionClient } from '../../interfaces/database.interface.js';

export interface ITokenRepository {
  save(userId: string, token: string, expiresAt: Date, tx?: TTransactionClient): Promise<RefreshTokenEntity>;
  findByToken(token: string, tx?: TTransactionClient): Promise<RefreshTokenEntity | null>;
  deleteById(id: bigint, tx?: TTransactionClient): Promise<void>;
  deleteAllByUserId(userId: string, tx?: TTransactionClient): Promise<void>;
}
