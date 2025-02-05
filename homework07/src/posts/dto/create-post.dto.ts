import { IsString, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { PostStatus } from 'src/constants/postEnum';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsEnum(PostStatus)
  status: PostStatus = PostStatus.PUBLISHED;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
