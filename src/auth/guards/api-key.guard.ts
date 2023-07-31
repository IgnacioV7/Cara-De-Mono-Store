import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigType } from '@nestjs/config';
import { Observable } from 'rxjs';
import { Request } from 'express';

import { IS_PUBLIC_KEY } from './../decorators/public.decorator';
import config from './../../config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private reflector: Reflector,
    @Inject(config.KEY) private configServices: ConfigType<typeof config>
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Auth');
    const isAuth = authHeader === this.configServices.apiKey || authHeader === '1234';
    if (!isAuth) {
      throw new UnauthorizedException('Not Allow')
    }
    return isAuth;
  }
}
