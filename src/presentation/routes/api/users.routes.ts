import { Router } from 'express';
import { UserController } from '../../controllers/user.controller';
import { CreateUserDto } from '../../dtos/user/create-user.dto';
import { DependencyRegistrar } from '../../../shared/di/container';
import { validateDtoMiddleware } from '../../middleware/validate.middleware';

export const createRoutes = (): Router => {
  const router = Router();
  const userController = DependencyRegistrar.getContainer().resolve<UserController>('UserController');
  
  // User routes
  router.get('/', userController.getUsers.bind(userController));
  router.post('/', validateDtoMiddleware(CreateUserDto), userController.createUser.bind(userController));

  return router;
};