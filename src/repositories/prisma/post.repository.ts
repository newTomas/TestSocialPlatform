import { IPost, IPosts } from '../../interfaces/post.interface.js';
import { PrismaClient } from '../../generated/prisma/client.js';
import { IPostRepository } from '../interfaces/post.repository.interface.js';
import { GetAllPostsDto } from '../../dtos/Post.dto.js';
import { PostFindManyArgs } from '../../generated/prisma/models.js';
import { TTransactionClient } from '../../interfaces/database.interface.js';

export class PrismaPostRepository implements IPostRepository {
  constructor(private readonly prisma: PrismaClient) { }

	private getClient(tx?: TTransactionClient): PrismaClient {
		return tx ?? this.prisma;
	}

  async create(userId: string, text: string, tx?: TTransactionClient): Promise<IPost> {
    const post = await this.getClient(tx).post.create({
      data: {
        userId,
        text,
      },
    })
    return post;
  }

  async get(id: string, tx?: TTransactionClient): Promise<IPost | null> {
    const post = await this.getClient(tx).post.findUnique({
      where: {
        id,
        deletedAt: null,
      }
    });

    return post;
  }

  async getAll(dto: GetAllPostsDto, tx?: TTransactionClient): Promise<IPosts> {
    let args: PostFindManyArgs = {
      where: {
        deletedAt: null,
      },
      orderBy: {
        id: "desc",
      },
      take: dto.limit,
    };

    if (dto.userId) {
      args.where!.userId = dto.userId;
    }

    if (dto.cursor) {
      args.cursor = {
        id: dto.cursor
      }
    }

    const posts = await this.getClient(tx).post.findMany(args);

    return {
      cursor: posts.at(-1)?.id,
      posts: posts,
    }
  }

  async edit(userId: string, id: string, text: string, tx?: TTransactionClient): Promise<IPost | null> {
    const post = await this.getClient(tx).post.update({
      where: {
        id,
        userId,
      },
      data: {
        text,
        updatedAt: new Date(),
      }
    });

    return post;
  }

  async delete(userId: string, id: string, tx?: TTransactionClient): Promise<boolean> {
    const res = await this.getClient(tx).post.update({
      where: {
        id,
        userId,
      },
      data: {
        deletedAt: new Date(),
      }
    });

    return Boolean(res);
  }
}
