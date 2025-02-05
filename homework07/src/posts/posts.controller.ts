import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { PostOwnerGuard } from 'src/auth/guards/post-owner.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() dto: CreatePostDto,
    @Request() req: ExpressRequest & { user: User },
  ) {
    return this.postsService.create(dto, req.user);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @UseGuards()
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, PostOwnerGuard)
  update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    return this.postsService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PostOwnerGuard)
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
