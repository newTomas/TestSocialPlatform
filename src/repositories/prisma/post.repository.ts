import { IPost, IPosts } from '../../interfaces/post.interface.js';
import { PrismaClient } from '../../generated/prisma/client.js';
import { IPostRepository } from '../interfaces/post.repository.interface.js';
import { GetAllPostsDto } from '../../dtos/GetAllPosts.dto.js';
import { PostFindManyArgs } from '../../generated/prisma/models.js';

export class PrismaPostRepository implements IPostRepository {
  constructor(private readonly prisma: PrismaClient) { }

  async create(userId: string, text: string): Promise<IPost> {
    const post = await this.prisma.post.create({
      data: {
        userId,
        text,
      },
    })
    return post;
  }

  async get(id: string): Promise<IPost | null> {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
        deletedAt: null,
      }
    });

    return post;
  }

  async getAll(dto: GetAllPostsDto): Promise<IPosts> {
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

    const posts = await this.prisma.post.findMany(args);

    return {
      cursor: posts.at(-1)?.id,
      posts: posts,
    }
  }

  async edit(userId: string, id: string, text: string): Promise<IPost | null> {
    const post = await this.prisma.post.update({
      where: {
        id,
        userId,
      },
      data: {
        text,
      }
    });

    return post;
  }

  async delete(userId: string, id: string): Promise<boolean> {
    const res = await this.prisma.post.update({
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
