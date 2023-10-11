import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@auth/auth';

import { JwtRefreshTokenGuard } from './guards/jwt-refresh.guard';
import { JwtAuthService } from './jwt-auth.service';

import { CreateUserDto } from '../users/dto/create-user-dto';
import { LoginUserDto } from '../users/dto/login-user-dto';

@Controller('auth')
export class JwtAuthController {
	constructor(private readonly jwtAuthService: JwtAuthService) {}

	@HttpCode(200)
	@Post('/login')
	async login(@Body() userDto: LoginUserDto) {
		return await this.jwtAuthService.login(userDto);
	}

	@HttpCode(201)
	@Post('/registration')
	async registration(@Body() userDto: CreateUserDto) {
		return await this.jwtAuthService.registration(userDto);
	}

	@UseGuards(JwtRefreshTokenGuard)
	@HttpCode(200)
	@Post('/updateAccess')
	async updateAccess(@CurrentUser() user) {
		return await this.jwtAuthService.getNewAccessAndRefreshToken({ email: user.email });
	}
}
