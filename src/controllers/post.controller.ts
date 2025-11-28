import { Request, Response } from 'express';
import { PostService } from 'src/services/post.service.js';
import { CreatePostDto } from 'src/dtos/CreatePost.dto.js';

export class PostController {
  constructor(private readonly postService: PostService) { }

  public async create(req: Request, res: Response) {
    try {
      const dto: CreatePostDto = req.body;

      const result = await this.postService.CreatePost(req.user!.userId, dto);

      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
