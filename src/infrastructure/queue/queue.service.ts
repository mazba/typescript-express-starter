import Bull, { Queue, Job } from 'bull';
import { injectable } from 'tsyringe';
import { Logger } from '../logger/logger.service';
import { appConfig } from '../../config/app.config';

@injectable()
export class QueueService {
  private queues: Map<string, Queue>;

  constructor(private logger: Logger) {
    this.queues = new Map();
  }

  createQueue(name: string, options?: Bull.QueueOptions): Queue {
    if (this.queues.has(name)) {
      return this.queues.get(name)!;
    }

    const queue = new Bull(name, {
      redis: appConfig.redis,
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000
        }
      },
      ...options
    });

    this.setupQueueEvents(queue, name);
    this.queues.set(name, queue);
    return queue;
  }

  private setupQueueEvents(queue: Queue, name: string): void {
    queue.on('completed', (job: Job) => {
      this.logger.info(`Job ${job.id} completed in queue ${name}`);
    });

    queue.on('failed', (job: Job, error: Error) => {
      this.logger.error(`Job ${job.id} failed in queue ${name}:`, error);
    });

    queue.on('error', (error: Error) => {
      this.logger.error(`Queue ${name} error:`, error);
    });
  }

  async addJob<T>(
    queueName: string,
    data: T,
    options?: Bull.JobOptions
  ): Promise<Job<T>> {
    const queue = this.getQueue(queueName);
    return await queue.add(data, options);
  }

  private getQueue(name: string): Queue {
    const queue = this.queues.get(name);
    if (!queue) {
      throw new Error(`Queue ${name} not found`);
    }
    return queue;
  }
}
