import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsEmail,
  IsInt,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsInt()
  @Min(18)
  @Max(100)
  age: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
