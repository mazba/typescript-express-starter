import { inject, injectable } from 'tsyringe';
import { CreateUserUseCase } from '../use-cases/user/create-user.use-case';

@injectable()
export class UserService {
  constructor(
    @inject('CreateUserUseCase') private createUserUseCase: CreateUserUseCase
  ) {}

  async createUser(userData: any) {
    return await this.createUserUseCase.execute(userData);
  }
}