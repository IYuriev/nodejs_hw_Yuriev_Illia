import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class PostOwnerGuard implements CanActivate {
  constructor(private readonly postsService: PostsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const postId = +req.params.id;

    const user = req.user;
    if (!user) {
      throw new ForbiddenException('You are not authenticated');
    }

    const post = await this.postsService.findOne(postId);
    if (!post) {
      throw new ForbiddenException('Post not found');
    }

    if (post.user.id !== user.id) {
      throw new ForbiddenException(
        'Only the author can modify or delete this post',
      );
    }

    return true;
  }
}
