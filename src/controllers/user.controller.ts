import { Request, Response } from 'express';
import { UserService } from '../services/user.service.js';
import { GetUserDto, GetAllUsersDto } from '../dtos/User.dto.js';

export class UserController {
  constructor(private readonly userService: UserService) { }

  public async get(req: Request, res: Response) {
    try {
      const dto: GetUserDto = req.body;

      const result = await this.userService.GetUser(dto);

      return res.status(result ? 200 : 404).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const dto: GetAllUsersDto = req.body;

      const result = await this.userService.GetAllUsers(dto);

      return res.status(result ? 200 : 404).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
