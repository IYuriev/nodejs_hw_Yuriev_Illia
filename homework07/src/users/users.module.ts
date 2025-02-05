import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { Comment } from 'src/comments/entities/comment.entity';
import { Post } from 'src/posts/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Post, Comment]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
