import express, { Application, Router, Request, Response, NextFunction } from 'express';
import config from './config';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { Logger } from './infrastructure/logger/logger.service';
import { DependencyRegistrar } from './shared/di/container';
import { registerRoutes } from './presentation/routes';

export class App {
  public app: Application;
  private initialized: boolean = false;

  constructor() {
    this.app = express();
    this.configureMiddleware();
  }

  private configureMiddleware(): void {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    
    const limiter = rateLimit({
      windowMs: config.app.RATE_LIMIT.WINDOW_MS,
      max: config.app.RATE_LIMIT.MAX,
    });
    this.app.use(limiter);
  }

  public initialize(): void {
    if (this.initialized) {
      return;
    }

    const container = DependencyRegistrar.getContainer();
    const logger = container.resolve<Logger>('Logger');

    // request logging
    this.app.use(morgan('combined', { 
      stream: { write: (message) => logger.info(message.trim()) } 
    }));

    // Configure routes
    const router = Router();
    registerRoutes(router);
    this.app.use('/', router);

    // Configure error handling
    this.configureErrorHandling(logger);

    this.initialized = true;
  }

  private configureErrorHandling(logger: Logger): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      logger.error(`Not found: ${req.originalUrl}`);
      res.status(404).json({ error: 'Not found' });
    });
  }
}