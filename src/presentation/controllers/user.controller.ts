import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { UserService } from '../../application/services/user.service';
import { CreateUserDto } from '../dtos/user.dto';
@injectable()
export class UserController {
  constructor(private userService: UserService) {}

  async createUser(req: Request, res: Response): Promise<void> {
    const dto = req.body as CreateUserDto;
    const user = await this.userService.createUser(dto);
    res.status(201).json(user);
  }

  // async getUserById(req: Request, res: Response): Promise<void> {
  //   const user = await this.userService.findById(req.params.id);
  //   res.json(user);
  // }
}