import { IDto } from '../interfaces/dto.interface';
import { IValidator } from '../interfaces/validator.interface';
import { ITransformer } from '../interfaces/transformer.interface';
import { ClassValidatorAdapter } from '../validators/class-validator.adapter';
import { ClassTransformerAdapter } from '../transformers/class-transformer.adapter';

export abstract class BaseDto implements IDto {
  private static validator: IValidator = new ClassValidatorAdapter();
  private static transformer: ITransformer = new ClassTransformerAdapter();

  async validate(): Promise<void> {
    await BaseDto.validator.validate(this);
  }

  transform<T>(data: Record<string, any>): T {
    return BaseDto.transformer.transform(data, this.constructor as new () => T);
  }

  static async createFrom<T extends BaseDto>(
    this: new () => T,
    data: Record<string, any>
  ): Promise<T> {
    const instance = new this();
    const transformed = instance.transform<T>(data);
    await transformed.validate();
    return transformed;
  }
}