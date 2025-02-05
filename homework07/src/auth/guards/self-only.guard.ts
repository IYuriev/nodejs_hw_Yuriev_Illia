import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class SelfOnlyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const userIdFromToken = req.user?.id;
    const userIdFromParam = +req.params.id;

    if (userIdFromToken !== userIdFromParam) {
      throw new ForbiddenException('You can operate only on your own profile');
    }
    return true;
  }
}
