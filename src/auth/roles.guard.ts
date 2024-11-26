import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard extends JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // If no roles are specified, access is allowed
    }

    const user = context.switchToHttp().getRequest().user;
    return roles.some((role) => user.roles?.includes(role)); // Check if the user has one of the required roles
  }
}
