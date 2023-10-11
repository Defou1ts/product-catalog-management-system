import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../decorators/roles-auth.decorator';

import type { GraphQLExecutionContext } from '@nestjs/graphql';
import type { CanActivate } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: GraphQLExecutionContext): boolean {
		try {
			const requiredRole = this.reflector.getAllAndOverride<string>(ROLES_KEY, [
				context.getHandler(),
				context.getClass(),
			]);

			if (!requiredRole) {
				return true;
			}

			const headers = context.getArgs()[2].req.headers;

			const user = JSON.parse(headers.user);

			return user.role.value === requiredRole;
		} catch (e) {
			throw new HttpException('No access', HttpStatus.FORBIDDEN);
		}
	}
}
