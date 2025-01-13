import { validate as classValidate, ValidationError } from 'class-validator';
import { IValidator } from '../interfaces/validator.interface';
import { ValidationException } from '../exceptions/validation.exception';

export class ClassValidatorAdapter implements IValidator {
async validate(target: any): Promise<void> {
    const errors: ValidationError[] = await classValidate(target);
    if (errors.length > 0) {
    throw new ValidationException(this.formatErrors(errors));
    }
}

private formatErrors(errors: ValidationError[]): Record<string, string[]> {
    return errors.reduce((acc, error) => {
    acc[error.property] = Object.values(error.constraints || {});
    return acc;
    }, {} as Record<string, string[]>);
}
}