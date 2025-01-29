import { Request, Response } from "express";
import { CreateUserDto } from "../dtos/user/create-user.dto";
import { UserService } from "../../application/services/user.service";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserController {
  constructor(
    @inject("UserService") private userService: UserService
  ) {}

  async createUser(req: Request, res: Response) {
    const userData: CreateUserDto = req.body;
    try {
      const user = await this.userService.createUser(userData);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
  async getUsers(req: Request, res: Response) {
    try {
      res.status(201).json([
        {
          id: 1,
          name: "Md. Mazba"
        },
        {
          id: 2,
          name: "Kamal"
        },
      ]);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}