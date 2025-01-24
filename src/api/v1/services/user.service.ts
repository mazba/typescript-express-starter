import { injectable } from 'tsyringe';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { IUser } from '../../../models/user.model';

@injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(data: CreateUserDto): Promise<IUser> {
    return await this.userRepository.create(data);
  }

  // async findById(id: string): Promise<IUser> {
  //   return await this.userRepository.findById(id);
  // }
}