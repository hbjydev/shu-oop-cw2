import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class IsVoterGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    return user.type == 'voter';
  }
}
