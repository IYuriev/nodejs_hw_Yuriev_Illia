import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  content: string;
}

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
