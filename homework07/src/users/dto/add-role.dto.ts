import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @IsString()
  value: string;

  @IsNumber()
  userId: number;
}
