import User from "../entities/user.entity";
import {
  ISaveRepository,
  IFindByIdRepository
} from "./base.repository.interface";

export interface IUserRepository
  extends ISaveRepository<User>,
    IFindByIdRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}