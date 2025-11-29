import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';
import { CreateUserDto } from '../dtos/CreateUser.dto.js';
import { LoginUserDto } from '../dtos/LoginUser.dto.js';
import { RefreshTokenDto } from '../dtos/RefreshToken.dto.js';

export class AuthController {
  constructor(private readonly authService: AuthService) { }

  public async register(req: Request, res: Response) {
    try {
      const dto: CreateUserDto = req.body;

      const result = await this.authService.register(dto);

      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const dto: LoginUserDto = req.body;
      const result = await this.authService.login(dto);
      return res.json(result);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  public async refresh(req: Request, res: Response) {
    try {
      const dto: RefreshTokenDto = req.body;
      const result = await this.authService.refresh(dto.refreshToken);
      return res.json(result);
    } catch (error: any) {
      return res.status(403).json({ message: error.message });
    }
  }
}
