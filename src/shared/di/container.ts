import 'reflect-metadata';
import { container, DependencyContainer } from 'tsyringe';
import { glob } from 'glob';
import path from 'path';
import { Logger } from '../../infrastructure/logger/logger.service';
import { MongoDBConnection } from '../../infrastructure/database/connections/mongodb.connection';
console.log('container file loadded');
export class DependencyRegistrar {
  private static isInitialized = false;
  private static container: DependencyContainer;

  private static registerSingletons(): void {
    container.registerSingleton('Logger', Logger);
    container.registerSingleton('MongoDBConnection', MongoDBConnection);
    // TODO: New singletons
  }

  private static registerDependencies(): void {
    const patterns = [
      path.join(process.cwd(), 'src/application/**/*.service.{ts,js}'),
      path.join(process.cwd(), 'src/application/**/*.use-case.{ts,js}'),
      path.join(process.cwd(), 'src/infrastructure/**/*.repository.{ts,js}'),
      path.join(process.cwd(), 'src/presentation/**/*.controller.{ts,js}')
    ];

    patterns.forEach((pattern) => {
      const files = glob.sync(pattern);
      files.forEach((file) => {
        const modulePath = path.resolve(file);
        try {
          const module = require(modulePath);
          Object.keys(module).forEach((key) => {
            const dependency = module[key];
            if (dependency?.name && typeof dependency === 'function') {
              container.register(dependency.name, { useClass: dependency });
              console.log(`Registered dependency: ${dependency.name}`);
            }
          });
        } catch (error) {
          console.error(`Failed to register dependency from ${file}:`, error);
        }
      });
    });
  }

  public static initialize(): DependencyContainer {
    console.log('Initializing dependencies...');
    if (!this.isInitialized) {
      this.registerSingletons();
      this.registerDependencies();
      this.container = container;
      this.isInitialized = true;
    }
    return this.container;
  }

  public static getContainer(): DependencyContainer {
    if (!this.isInitialized) {
      throw new Error('Dependencies not initialized. Call initialize() first.');
    }
    return this.container;
  }
}

export { container };