import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { CommentOwnerGuard } from 'src/auth/guards/comment-owner.guard';
import { CommentDeleteGuard } from 'src/auth/guards/comment-delete.guard';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto,
    @Req() req: ExpressRequest & { user: User },
  ) {
    const userId = req.user.id;
    return this.commentsService.create(+postId, dto, userId);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, CommentOwnerGuard)
  update(@Param('id') id: string, @Body() dto: UpdateCommentDto) {
    return this.commentsService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, CommentDeleteGuard)
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
