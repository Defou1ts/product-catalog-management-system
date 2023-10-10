import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { jwtConfigRegister, JwtConfig } from '../../config/jwt.config';
import { UsersService } from '../../users/users.service';

import type { JwtPayload } from './jwt-strategy';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
	constructor(
		@Inject(jwtConfigRegister.KEY) private readonly jwtConfig: JwtConfig,
		private readonly userServiceClient: UsersService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwtConfig.refreshTokenSecret,
		});
	}

	async validate(payload: JwtPayload) {
		const { email } = payload;
		const user = await this.userServiceClient.getUserByEmail(email);

		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
