import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { injectable, inject } from 'tsyringe';
import { Logger } from './infrastructure/logger/logger.service';
import { MongoDBConnection } from './infrastructure/database/mongodb.connection';
import { I18nService } from './infrastructure/i18n/i18n.service';
// import { errorHandler } from './infrastructure/middleware/error.middleware';
// import { notFoundHandler } from './infrastructure/middleware/notFound.middleware';
// import { requestLogger } from './infrastructure/middleware/request-logger.middleware';
import { apiV1Router } from './presentation/routes';

@injectable()
export class App {
  private app: Express;

  constructor(
    @inject(Logger) private logger: Logger,
    @inject(MongoDBConnection) private dbConnection: MongoDBConnection,
    @inject(I18nService) private i18n: I18nService
  ) {
    this.app = express();
  }

  public async initialize(): Promise<void> {
    await this.initializeMiddlewares();
    await this.initializeDatabaseConnection();
    this.initializeRouters();
    this.initializeErrorHandling();
  }

  private async initializeMiddlewares(): Promise<void> {
    // Security middleware
    this.app.use(helmet());
    
    // CORS
    this.app.use(cors());
    
    // Body parsing
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    
    // Compression
    this.app.use(compression());
    
    // Request logging
    // this.app.use(requestLogger(this.logger));
    
    // i18n middleware
    // this.app.use(this.i18n.middleware());
    
    // Health check endpoint
    this.app.get('/health', (req: Request, res: Response) => {
      res.status(200).json({ status: 'ok' });
    });
  }

  private async initializeDatabaseConnection(): Promise<void> {
    try {
      await this.dbConnection.connect();
      this.logger.info('Database connection established');
    } catch (error) {
      this.logger.error('Database connection failed:', error);
      throw error;
    }
  }

  private initializeRouters(): void {
    // API routes
    this.app.use('/api/v1', apiV1Router);
    // this.app.use('/api/v2', apiV2Router);
  }

  private initializeErrorHandling(): void {
    // 404 handler
    // this.app.use(notFoundHandler);
    
    // Global error handler
    // this.app.use(errorHandler);
  }

  public listen(port: number): any {
    return this.app.listen(port);
  }
}