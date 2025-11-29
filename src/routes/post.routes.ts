import { Router } from 'express';
import prisma from '../utils/prisma.utils.js';
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import { CreatePostDto, GetPostDto, GetAllPostsDto, EditPostDto, DeletePostDto } from '../dtos/Post.dto.js';
import { PostController } from '../controllers/post.controller.js';
import { PostService } from '../services/post.service.js';
import { PrismaPostRepository } from '../repositories/prisma/post.repository.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

const postRepo = new PrismaPostRepository(prisma);

const postService = new PostService(postRepo);

const postController = new PostController(postService);

// === PRIVATE ===
router.post('/', authMiddleware, validationMiddleware(CreatePostDto), postController.create.bind(postController));
router.patch('/:id', authMiddleware, validationMiddleware(EditPostDto), postController.edit.bind(postController));
router.delete('/:id', authMiddleware, validationMiddleware(DeletePostDto), postController.delete.bind(postController));

// === PUBLIC ===
router.get('/', validationMiddleware(GetAllPostsDto), postController.getAll.bind(postController));
router.get('/:id', validationMiddleware(GetPostDto), postController.get.bind(postController));

export default router;
