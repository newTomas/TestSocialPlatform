import { Request, Response } from 'express';
import { UserService } from '../services/user.service.js';
import { GetUserDto, GetAllUsersDto } from '../dtos/User.dto.js';
import { UserMapper } from '../mappers/user.mapper.js';

export class UserController {
  constructor(private readonly userService: UserService) { }

  public async get(req: Request, res: Response) {
    try {
      const dto: GetUserDto = req.body;

      const result = await this.userService.GetUser(dto);

      if (!result) return res.status(404).json(result);

      const resultDtos = UserMapper.toResponseDto(result);

      return res.status(200).json(resultDtos);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const dto: GetAllUsersDto = req.body;

      const result = await this.userService.GetAllUsers(dto);

      if (!result) return res.status(404).json(result);

      const usersDtos = result.users.map(UserMapper.toResponseDto);

      return res.status(200).json({
        cursor: result.cursor,
        users: usersDtos,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
