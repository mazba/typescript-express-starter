import { injectable } from 'tsyringe';
// import { Repository } from 'typeorm';
// import { UserEntity } from '../../../entities/user.entity'; //TODO: database need to be agonistic
import { IUserModel, UserModel } from '../../../models/user.model';
import { Model } from "mongoose";
import { CreateUserDto } from '../dtos/user.dto';

@injectable()
export class UserRepository {
  constructor(
    private repository: Model<IUserModel>
  ) {}

  // async create(data: CreateUserDto): Promise<IUserModel> {
  // }

  async findById(id: string): Promise<IUserModel> {
    const user = await this.repository.findById(id);
    if (!user) 
      throw new Error('User not found');
    return user;
  }
}