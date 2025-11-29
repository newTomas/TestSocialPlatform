import { Router } from 'express';
import prisma from '../utils/prisma.utils.js';
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import { UserController } from '../controllers/user.controller.js';
import { UserService } from '../services/user.service.js';
import { PrismaUserRepository } from '../repositories/prisma/user.repository.js';
import { GetAllUsersDto, GetUserDto } from '../dtos/User.dto.js';

const router = Router();

const userRepo = new PrismaUserRepository(prisma);

const userService = new UserService(userRepo);

const userController = new UserController(userService);

router.get('/', validationMiddleware(GetAllUsersDto), userController.getAll.bind(userController));
router.get('/:id', validationMiddleware(GetUserDto), userController.get.bind(userController));

export default router;
