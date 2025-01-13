import express, { Express } from 'express';

export class App {
  private app: Express;

  constructor() {
    this.app = express();
    // this.initializeMiddlewares();
    this.initializeRouters();
  }

  private initializeRouters(): void {
  }
}