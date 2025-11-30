import { Request, Response } from 'express';
import { PostService } from '../services/post.service.js';
import { CreatePostDto, GetPostDto, GetAllPostsDto, DeletePostDto, EditPostDto } from '../dtos/Post.dto.js';
import { PostMapper } from '../mappers/post.mapper.js';

export class PostController {
  constructor(private readonly postService: PostService) { }

  public async get(req: Request, res: Response) {
    try {
      const dto: GetPostDto = req.body;

      const result = await this.postService.GetPost(dto);

      if (!result) return res.status(404).json(result);

      const resultDtos = PostMapper.toResponseDto(result);

      return res.status(200).json(resultDtos);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const dto: GetAllPostsDto = req.body;

      const result = await this.postService.GetAllPosts(dto);

      const postsDtos = result.posts.map(PostMapper.toResponseDto);

      return res.status(200).json({
        cursor: result.cursor,
        posts: postsDtos,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const dto: CreatePostDto = req.body;

      const result = await this.postService.CreatePost(req.user!, dto);

      const resultDtos = PostMapper.toResponseDto(result);

      return res.status(201).json(resultDtos);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const dto: DeletePostDto = req.body;

      const result = await this.postService.DeletePost(req.user!, dto);

      if (!result) return res.status(404).json(result);

      const resultDtos = PostMapper.toResponseDto(result);

      return res.status(200).json(resultDtos);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  public async edit(req: Request, res: Response) {
    try {
      const dto: EditPostDto = req.body;

      const result = await this.postService.EditPost(req.user!, dto);

      if (!result) return res.status(404).json(result);

      const resultDtos = PostMapper.toResponseDto(result);

      return res.status(200).json(resultDtos);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
