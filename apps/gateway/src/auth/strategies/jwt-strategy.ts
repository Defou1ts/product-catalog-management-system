import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { jwtConfigRegister, JwtConfig } from '../../config/jwt.config';
import { UsersService } from '../../users/users.service';

export interface JwtPayload {
	email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(
		@Inject(jwtConfigRegister.KEY) private readonly jwtConfig: JwtConfig,
		private readonly userService: UsersService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwtConfig.accessTokenSecret,
		});
	}

	async validate(payload: JwtPayload) {
		const { email } = payload;
		const user = await this.userService.getUserByEmail(email);

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
