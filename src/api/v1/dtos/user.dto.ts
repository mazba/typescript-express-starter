import { IsString, IsEmail, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';
export class CreateUserDto {
    @IsString()
    @MinLength(2)
    @Expose()
    firstName: string;
  
    @IsString()
    @MinLength(2)
    @Expose()
    lastName: string;
  
    @IsEmail()
    @Expose()
    email: string;
  
    @IsString()
    @MinLength(8)
    @Expose()
    password: string;
  }