import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../users/users.service';

import type { JwtPayload } from '../strategies/jwt-strategy';
import type { NestMiddleware } from '@nestjs/common';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
	constructor(
		private readonly jwtService: JwtService,
		private readonly usersService: UsersService,
	) {}

	async use(req: any, res: any, next: (error?: any) => void) {
		try {
			const authHeader = req.headers.authorization;
			const bearer = authHeader.split(' ')[0];
			const token = authHeader.split(' ')[1];

			if (bearer !== 'Bearer' || !token) {
				throw new UnauthorizedException();
			}

			const { email } = this.jwtService.verify<JwtPayload>(token);

			const user = await this.usersService.getUserByEmail(email);

			if (!user) {
				throw new UnauthorizedException();
			}

			req.user = user;
			next();
		} catch (e) {
			throw new UnauthorizedException();
		}
	}
}
