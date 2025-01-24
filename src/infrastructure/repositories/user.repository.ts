import { injectable } from "tsyringe";
// import { Repository } from 'typeorm';
// import { UserEntity } from '../../../entities/user.entity'; //TODO: database need to be agonistic
import { IUser, UserModel } from "../../../domain/entities/user.model";
import { Model } from "mongoose";
import { CreateUserDto } from "../../presentation/dtos/user.dto";

@injectable()
export class UserRepository {
  constructor() {} // private repository: Model<IUser>

  async create(data: CreateUserDto): Promise<IUser> {
    const user: IUser = {
      firstName: "John",
      lastName: "Doe",
      email: "",
      password: "",
    };
    return user;
  }

  // async findById(id: string): Promise<IUser> {
  //   const user = await this.repository.findById(id);
  //   if (!user)
  //     throw new Error('User not found');
  //   return user;
  // }
}
