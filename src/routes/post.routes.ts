import { Router } from 'express';
import prisma from '../utils/prisma.utils.js';
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import { CreatePostDto } from 'src/dtos/CreatePost.dto.js';
import { PostController } from 'src/controllers/post.controller.js';
import { PostService } from 'src/services/post.service.js';
import { PrismaPostRepository } from 'src/repositories/prisma/post.repository.js';
import { authMiddleware } from 'src/middlewares/auth.middleware.js';

const router = Router();

const postRepo = new PrismaPostRepository(prisma);

const postService = new PostService(postRepo);

const postController = new PostController(postService);

router.post('/create', authMiddleware, validationMiddleware(CreatePostDto), postController.create.bind(postController));

export default router;
