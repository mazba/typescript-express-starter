import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controllers/user.controller';
import { validateDto } from '@common/middlewares/validate-dto.middleware';
import { CreateUserDto } from '../dtos/user.dto';
import { authMiddleware } from '@common/middlewares/auth.middleware';

export const userRouter = Router();
const userController = container.resolve(UserController);

userRouter
  .route('/')
  .post(validateDto(CreateUserDto), userController.createUser)
  .get(authMiddleware, userController.getUsers);

userRouter
  .route('/:id')
  .get(authMiddleware, userController.getUserById)
  .patch(authMiddleware, validateDto(UpdateUserDto), userController.updateUser)
  .delete(authMiddleware, userController.deleteUser);