import mongoose from 'mongoose';
import { injectable } from 'tsyringe';
import { Logger } from '../logger/logger.service';
import { appConfig } from '../../config/app.config';

@injectable()
export class MongoDBConnection {
  constructor(private logger: Logger) {}

  async connect(): Promise<void> {
    try {
      await mongoose.connect(appConfig.db.uri);
      this.logger.info('MongoDB connected successfully');

      mongoose.connection.on('error', (error) => {
        this.logger.error('MongoDB connection error:', error);
      });

      mongoose.connection.on('disconnected', () => {
        this.logger.warn('MongoDB disconnected');
      });
    } catch (error) {
      this.logger.error('MongoDB connection failed:', error);
      process.exit(1);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await mongoose.connection.close();
      this.logger.info('MongoDB disconnected successfully');
    } catch (error) {
      this.logger.error('Error disconnecting from MongoDB:', error);
      throw error;
    }
  }
}