import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../../domain/interfaces/user.repository.interface';
import User from '../../../domain/entities/user.entity';
import { ConflictException } from '../../../shared/exceptions/conflict.exception';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async execute(userData: any) {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Create and save the user
    const user = User.create(userData);
    return await this.userRepository.save(user);
  }
}