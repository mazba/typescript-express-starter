import { injectable } from 'tsyringe';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../interfaces/user.interface';

@injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(data: CreateUserDto): Promise<User> {
    return await this.userRepository.create(data);
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }
}