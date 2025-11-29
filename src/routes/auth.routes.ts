import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { AuthService } from '../services/auth.service.js';
import { PrismaUserRepository } from '../repositories/prisma/user.repository.js';
import { PrismaTokenRepository } from '../repositories/prisma/token.repository.js';
import prisma from '../utils/prisma.utils.js'; 
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import { CreateUserDto } from '../dtos/CreateUser.dto.js';
import { PrismaDatabaseService } from '../database/prisma.database.service.js';

const router = Router();

const userRepo = new PrismaUserRepository(prisma);
const tokenRepo = new PrismaTokenRepository(prisma);
const dbService = new PrismaDatabaseService(prisma);

const authService = new AuthService(userRepo, tokenRepo, dbService);

const authController = new AuthController(authService);

router.post('/register', validationMiddleware(CreateUserDto), authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));
router.post('/refresh', authController.refresh.bind(authController));

export default router;
