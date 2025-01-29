import 'reflect-metadata';
import config from './config';
import { DependencyRegistrar } from './shared/di/container';
import { App } from './app';
import { Logger } from './infrastructure/logger/logger.service';
import { MongoDBConnection } from './infrastructure/database/connections/mongodb.connection';

const initializeApp = async () => {
  try {
    // Initialize dependencies 
    const container = DependencyRegistrar.initialize();
    const logger = container.resolve<Logger>('Logger');
    const mongoDBConnection = container.resolve<MongoDBConnection>('MongoDBConnection');

    // Connect to databases and services
    await mongoDBConnection.connect();
    //TODO Initialize other services

    // Create and initialize the Application
    const app = new App();
    app.initialize();

    // Start the server
    const server = app.app.listen(config.app.PORT, () => {
      logger.info(`Server is running on http://localhost:${config.app.PORT}`);
    });

    // Handle graceful shutdown
    const signals = ['SIGTERM', 'SIGINT'];
    signals.forEach(signal => {
      process.on(signal, async () => {
        logger.warn(`Received ${signal}, starting graceful shutdown...`);
        
        server.close(async () => {
          try {
            // Cleanup resources
            await container.resolve(MongoDBConnection).disconnect();
            logger.warn('Graceful shutdown completed');
            process.exit(0);
          } catch (error) {
            logger.error('Error during graceful shutdown:', error);
            process.exit(1);
          }
        });
      });
    });
  } catch (error: any) {
    console.error(`Failed to start server: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
};

// Starting the application
initializeApp();