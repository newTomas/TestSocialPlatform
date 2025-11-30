import { PrismaClient } from '../../generated/prisma/client.js';
import { IPostRepository } from '../interfaces/post.repository.interface.js';
import { GetAllPostsDto } from '../../dtos/Post.dto.js';
import { PostFindManyArgs } from '../../generated/prisma/models.js';
import { TTransactionClient } from '../../interfaces/database.interface.js';
import { PostEntity } from '../../domain/post.entity.js';
import { IPosts } from '../../interfaces/post.interface.js';

export class PrismaPostRepository implements IPostRepository {
  constructor(private readonly prisma: PrismaClient) { }

  private getClient(tx?: TTransactionClient): PrismaClient {
    return tx ?? this.prisma;
  }

  async create(userId: string, text: string, tx?: TTransactionClient): Promise<PostEntity> {
    const post = await this.getClient(tx).post.create({
      data: {
        userId,
        text,
      },
    });

    return PostEntity.fromDto(post);
  }

  async get(id: string, tx?: TTransactionClient): Promise<PostEntity | null> {
    const post = await this.getClient(tx).post.findUnique({
      where: {
        id,
        deletedAt: null,
      }
    });

    if (!post) return null;

    return PostEntity.fromDto(post);
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
      cursor: posts.length == dto.limit ? posts[dto.limit - 1]!.id : null,
      posts: posts.map(PostEntity.fromDto),
    };
  }

  async save(post: PostEntity, tx?: TTransactionClient): Promise<PostEntity | null> {
    const updatedPost = await this.getClient(tx).post.update({
      where: {
        id: post.id,
      },
      data: post.getSnapshot(),
    });

    return PostEntity.fromDto(updatedPost);
  }
}
