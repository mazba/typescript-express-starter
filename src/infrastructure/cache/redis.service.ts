import { createClient } from 'redis';
import { promisify } from 'util';
import { injectable } from 'tsyringe';
import { Logger } from '../logger/logger.service';
import { appConfig } from '../../config/app.config';

@injectable()
export class RedisService {
  private client: ReturnType<typeof createClient>;
  private getAsync: (key: string) => Promise<string | null>;
  private setAsync: (key: string, value: string) => Promise<unknown>;
  private delAsync: (key: string) => Promise<number>;

  constructor(private logger: Logger) {
    this.client = createClient({
      url: `${appConfig.redis.host}:${appConfig.redis.port}`,
      password: appConfig.redis.password
    });

    this.setupRedisEvents();
    this.promisifyMethods();
  }

  private setupRedisEvents(): void {
    this.client.on('error', (error) => {
      this.logger.error('Redis error:', error);
    });

    this.client.on('connect', () => {
      this.logger.info('Redis connected successfully');
    });
  }

  private promisifyMethods(): void {
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  async get(key: string): Promise<string | null> {
    return await this.getAsync(key);
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.setAsync(key, value);
      this.client.expire(key, ttl);
    } else {
      await this.setAsync(key, value);
    }
  }

  async del(key: string): Promise<number> {
    return await this.delAsync(key);
  }
}