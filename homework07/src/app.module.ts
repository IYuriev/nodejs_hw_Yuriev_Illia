import { DatabaseModule } from './shared/database/database.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    PostsModule,
    RolesModule,
    AuthModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
