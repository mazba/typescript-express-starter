import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controllers/user.controller';
import { validateDtoMiddleware } from '../../../infrastructure/middleware/validate.middleware';
import { CreateUserDto } from '../dtos/user.dto';
import { AuthMiddleware } from '../../../infrastructure/middleware/auth.middleware';

export const userRouter = Router();
const userController = container.resolve(UserController);

userRouter
  .route('/')
  .post(validateDtoMiddleware(CreateUserDto), userController.createUser);