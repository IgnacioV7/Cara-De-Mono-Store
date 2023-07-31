import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ROLES_KEY } from './../decorators/roles.decorator';
import { PayloadToken } from './../models/token.model';
import { Role } from './../models/roles.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if(!roles){
      return true;
    }
    // ej: ['admin', 'customer', 'super-admin'];
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    // ej: { role: 'admin', sub: 22 }
    const isAuth = roles.some((role) => role === user.role);
    if(!isAuth){
      throw new UnauthorizedException('Your role is wrong');
    }
    return isAuth;
  }
}
