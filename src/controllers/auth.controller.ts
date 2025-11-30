import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';
import { CreateUserDto, LoginUserDto, RefreshTokenDto } from '../dtos/Auth.dto.js';
import { RefreshTokenMapper } from '../mappers/auth.mapper.js';

export class AuthController {
  constructor(private readonly authService: AuthService) { }

  public async register(req: Request, res: Response) {
    try {
      const dto: CreateUserDto = req.body;

      const result = await this.authService.register(dto);

      const resultDtos = RefreshTokenMapper.toResponseDto(result);

      return res.status(201).json(resultDtos);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const dto: LoginUserDto = req.body;

      const result = await this.authService.login(dto);

      const resultDtos = RefreshTokenMapper.toResponseDto(result);

      return res.json(resultDtos);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  public async refresh(req: Request, res: Response) {
    try {
      const dto: RefreshTokenDto = req.body;

      const result = await this.authService.refresh(dto.refreshToken);

      const resultDtos = RefreshTokenMapper.toResponseDto(result);

      return res.json(resultDtos);
    } catch (error: any) {
      return res.status(403).json({ message: error.message });
    }
  }
}
