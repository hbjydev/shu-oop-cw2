import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class IsUserGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    return user.type == 'user';
  }
}
