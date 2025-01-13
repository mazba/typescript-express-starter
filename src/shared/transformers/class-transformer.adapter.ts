import { plainToInstance } from 'class-transformer';
import { ITransformer } from '../interfaces/transformer.interface';

export class ClassTransformerAdapter implements ITransformer {
transform<T>(data: Record<string, any>, targetClass: new () => T): T {
    return plainToInstance(targetClass, data, {
    excludeExtraneousValues: true
    });
}
}