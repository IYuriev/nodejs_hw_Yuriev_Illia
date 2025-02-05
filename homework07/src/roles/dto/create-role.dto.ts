import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  value: string;

  @IsString()
  description: string;
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
