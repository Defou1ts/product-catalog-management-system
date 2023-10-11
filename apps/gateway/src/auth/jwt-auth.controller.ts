import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@auth/auth';

import { JwtRefreshTokenGuard } from './guards/jwt-refresh.guard';
import { JwtAuthService } from './jwt-auth.service';
import { IsPublic } from './guards/is-public.decorator';

import { CreateUserDto } from '../users/dto/create-user-dto';
import { LoginUserDto } from '../users/dto/login-user-dto';

@Controller('auth')
export class JwtAuthController {
	constructor(private readonly jwtAuthService: JwtAuthService) {}

	@IsPublic()
	@HttpCode(200)
	@Post('/login')
	async login(@Body() userDto: LoginUserDto) {
		return await this.jwtAuthService.login(userDto);
	}

	@IsPublic()
	@HttpCode(201)
	@Post('/registration')
	async registration(@Body() userDto: CreateUserDto) {
		return await this.jwtAuthService.registration(userDto);
	}

	@IsPublic()
	@UseGuards(JwtRefreshTokenGuard)
	@HttpCode(200)
	@Post('/updateAccess')
	async updateAccess(@CurrentUser() user) {
		return await this.jwtAuthService.getNewAccessAndRefreshToken({ email: user.email });
	}
}
