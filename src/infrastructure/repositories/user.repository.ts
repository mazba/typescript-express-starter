import { injectable } from 'tsyringe';
import User from '../../domain/entities/user.entity';
import { UserModel } from '../database/models/user.model';
import { IUserRepository } from '../../domain/interfaces/user.repository.interface';

@injectable()
export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    // Fetch user from the database using Mongoose
    const userDoc = await UserModel.findOne({ email }).exec();
    if (!userDoc) return null;

    // Convert document to domain entity
    return User.fromPersistence(userDoc);
  }

  async save(user: User): Promise<User> {
    // Save user to the database using Mongoose
    const userDoc = new UserModel({
      name: user.name,
      email: user.email,
    });

    const savedUser = await userDoc.save();

    // Convert document to domain entity
    return User.fromPersistence(savedUser);
  }
  async findById(id: string): Promise<User | null> {
    // Fetch user from the database using Mongoose
    const userDoc = await UserModel.findById(id).exec();
    if (!userDoc) return null;

    // Convert document to domain entity
    return User.fromPersistence(userDoc);
  }
}