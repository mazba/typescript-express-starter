import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { BaseDto } from '../../../shared/dtos/base.dto';

export class CreateUserDto extends BaseDto<CreateUserDto> {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Expose()
  @IsEmail()
  email!: string;

  // Sensitive field excluded from response
  @IsString()
  password!: string;

  /**
   * Apply additional transformations if necessary.
   */
  protected transform(): Record<string, unknown> {
    return { id: this.id, name: this.name, email: this.email };
  }
}

export class UpdateUserDto extends BaseDto<CreateUserDto> {
  @Expose()
  @IsString()
  @IsNotEmpty()
  id!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Expose()
  @IsEmail()
  email!: string;

  // Sensitive field excluded from response
  @IsString()
  password!: string;

  /**
   * Apply additional transformations if necessary.
   */
  protected transform(): Record<string, unknown> {
    return { id: this.id, name: this.name, email: this.email };
  }
}