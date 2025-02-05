import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { CommentsService } from 'src/comments/comments.service';

@Injectable()
export class CommentDeleteGuard implements CanActivate {
  constructor(private readonly commentsService: CommentsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const commentId = +req.params.id;
    const currentUserId = req.user.id;

    const comment = await this.commentsService.findOne(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (
      comment.user.id !== currentUserId &&
      comment.post.user.id !== currentUserId
    ) {
      throw new ForbiddenException(
        'You are not allowed to delete this comment',
      );
    }
    return true;
  }
}
