import { plainToInstance, Exclude, Expose, instanceToPlain } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export abstract class BaseDto<T> {
  /**
   * Validates the DTO instance.
   * @returns void or throws a validation error.
   */
  async validate(): Promise<void> {
    const errors: ValidationError[] = await validate(this);
    if (errors.length > 0) {
      const errorMessages = errors
        .map((e) => Object.values(e.constraints || {}).join(', '))
        .join('; ');
      throw new Error(`Validation failed: ${errorMessages}`);
    }
  }

  /**
   * Transform a plain object into an instance of the class.
   * @param cls The DTO class.
   * @param plain Plain object to transform.
   * @returns Instance of the class with excluded fields applied.
   */
  static from<T>(cls: new () => T, plain: Record<string, unknown>): T {
    return plainToInstance(cls, plain, { excludeExtraneousValues: true });
  }

  /**
   * Serialize the DTO to a plain object with only allowed fields.
   * @returns A plain object with filtered fields.
   */
  toJSON(): Record<string, unknown> {
    return instanceToPlain(this);
  }

  /**
   * Specify additional transformations (override for custom behavior).
   */
  protected abstract transform(): Record<string, unknown>;
}
