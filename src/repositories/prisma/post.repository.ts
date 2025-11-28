import { IPost } from 'src/interfaces/post.interface.js';
import { PrismaClient } from '../../generated/prisma/client.js';
import { IPostRepository } from '../interfaces/post.repository.interface.js';

export class PrismaPostRepository implements IPostRepository {
  constructor(private readonly prisma: PrismaClient) { }

  async create(userId: bigint, text: string): Promise<IPost> {
    const post = await this.prisma.post.create({
      data: {
        userId,
        text,
      },
    })
    return post;
  }

  async get(id: bigint): Promise<IPost | null> {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      }
    });

    return post;
  }
}
