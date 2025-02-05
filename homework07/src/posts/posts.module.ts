import { forwardRef, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Post, Comment]),
    forwardRef(() => AuthModule),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
