import 'reflect-metadata';
import { container } from 'tsyringe';
import { App } from './app';
import { Logger } from './infrastructure/logger/logger.service';
import { MongoDBConnection } from './infrastructure/database/connections/mongodb.connection';
import { I18nService } from './infrastructure/i18n/i18n.service';
import { QueueService } from './infrastructure/queue/queue.service';
import { RedisService } from './infrastructure/cache/redis.service';
import { appConfig } from './config/app.config';

async function bootstrap() {
  try {
    // Register services
    container.registerSingleton(Logger);
    container.registerSingleton(MongoDBConnection);
    container.registerSingleton(I18nService);
    container.registerSingleton(QueueService);
    container.registerSingleton(RedisService);

    const logger = container.resolve(Logger);
    const app = container.resolve(App);
    await app.initialize();

    const server = app.listen(appConfig.port);

    // Handle graceful shutdown
    const signals = ['SIGTERM', 'SIGINT'];
    signals.forEach(signal => {
      process.on(signal, async () => {
        logger.info(`Received ${signal}, starting graceful shutdown...`);
        
        server.close(async () => {
          try {
            // Cleanup resources
            await container.resolve(MongoDBConnection).disconnect();
            await container.resolve(RedisService).disconnect();
            await container.resolve(QueueService).disconnect();
            
            logger.info('Graceful shutdown completed');
            process.exit(0);
          } catch (error) {
            logger.error('Error during graceful shutdown:', error);
            process.exit(1);
          }
        });
      });
    });

    logger.info(`Server started on port ${appConfig.port}`);
  } catch (error) {
    const logger = container.resolve(Logger);
    logger.error('Application failed to start:', error);
    process.exit(1);
  }
}

bootstrap().catch((error) => {
  const logger = container.resolve(Logger);
  logger.error('Application failed to start:', error);
  process.exit(1);
});