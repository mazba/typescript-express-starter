import 'reflect-metadata';
import { container } from 'tsyringe';
import { App } from './app';
import { Logger } from './infrastructure/logger/logger.service';
import { MongoDBConnection } from './infrastructure/database/mongodb.connection';
import { I18nService } from './infrastructure/i18n/i18n.service';
import { QueueService } from './infrastructure/queue/queue.service';
import { RedisService } from './infrastructure/cache/redis.service';

async function bootstrap() {
  // Register services
  container.registerSingleton(Logger);
  container.registerSingleton(MongoDBConnection);
  container.registerSingleton(I18nService);
  container.registerSingleton(QueueService);
  container.registerSingleton(RedisService);

  const app = container.resolve(App);
  console.log(app);
  // await app.init();
}

bootstrap().catch((error) => {
  console.error('Application failed to start:', error);
  process.exit(1);
});