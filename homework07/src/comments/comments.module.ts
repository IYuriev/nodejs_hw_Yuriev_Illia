import { forwardRef, Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Post } from 'src/posts/entities/post.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Post, Comment]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
