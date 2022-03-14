import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/user/role.enum';
import { User } from '../user/user.entity';
import { ROLES_KEY } from './role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const { user: currentUser } = context.switchToHttp().getRequest();
    if (currentUser.type !== 'user') return false;
    const user = currentUser.rec as User;
    return requiredRoles.some((role) => user.role == role);
  }
}
