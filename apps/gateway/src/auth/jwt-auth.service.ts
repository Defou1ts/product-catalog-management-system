import {
	HttpException,
	HttpStatus,
	Inject,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UsersService } from '../users/users.service';
import { EncryptionConfig, encryptionConfigRegister } from '../config/encryption.config';
import { JwtConfig, jwtConfigRegister } from '../config/jwt.config';
import { UserRoles } from '../users/constants/user-roles';

import type { LoginUserDto } from '../users/dto/login-user-dto';
import type { JwtPayload } from './strategies/jwt-strategy';
import type { JwtLoginResponseDto } from './dto/jwt-login-response.dto';
import type { CreateUserDto } from '../users/dto/create-user-dto';

@Injectable()
export class JwtAuthService {
	constructor(
		@Inject(encryptionConfigRegister.KEY) private readonly encryptionConfig: EncryptionConfig,
		@Inject(jwtConfigRegister.KEY) private readonly jwtConfig: JwtConfig,
		private readonly userService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async onModuleInit() {
		const createdAdminEmail = 'admin@admin.com';
		const admin = await this.userService.getUserByEmail(createdAdminEmail);

		if (!admin) {
			await this.registration({ email: createdAdminEmail, password: '1234' });
			const createdAdmin = await this.userService.getUserByEmail(createdAdminEmail);
			await this.userService.setRole({ value: UserRoles.ADMIN, userId: createdAdmin.id });
		}
	}

	async login(userDto: LoginUserDto): Promise<JwtLoginResponseDto> {
		const user = await this.validateUser(userDto);

		const { email } = user;

		const accessToken = await this.getAccesToken({ email });
		const refreshToken = await this.getRefreshToken({ email });

		await this.updateRefreshTokenInUser(refreshToken, email);

		return {
			accessToken,
			refreshToken,
		};
	}

	async registration(userDto: CreateUserDto): Promise<JwtLoginResponseDto> {
		const candidate = await this.userService.getUserByEmail(userDto.email);

		if (candidate) {
			throw new HttpException('User with such email already exists', HttpStatus.BAD_REQUEST);
		}

		const hashPassword = await bcrypt.hash(userDto.password, this.encryptionConfig.salt);
		const user = await this.userService.createUser({ ...userDto, password: hashPassword });

		const { email } = user;

		const accessToken = await this.getAccesToken({ email });
		const refreshToken = await this.getRefreshToken({ email });

		await this.updateRefreshTokenInUser(refreshToken, email);

		return {
			accessToken,
			refreshToken,
		};
	}

	async getAccesToken(payload: JwtPayload) {
		const accessToken = this.jwtService.sign(payload, {
			secret: this.jwtConfig.accessTokenSecret,
			expiresIn: this.jwtConfig.accessTokenExpiration,
		});
		return accessToken;
	}

	async getRefreshToken(payload: JwtPayload) {
		const refreshToken = this.jwtService.sign(payload, {
			secret: this.jwtConfig.refreshTokenSecret,
			expiresIn: this.jwtConfig.refreshTokenExpiration,
		});
		return refreshToken;
	}

	async updateRefreshTokenInUser(refreshToken: string, email: string) {
		const hashedRefreshToken = await bcrypt.hash(refreshToken, this.encryptionConfig.salt);

		await this.userService.updateUserRefreshTokenByEmail(email, hashedRefreshToken);
	}

	async getNewAccessAndRefreshToken(payload: JwtPayload): Promise<JwtLoginResponseDto> {
		const refreshToken = await this.getRefreshToken(payload);
		await this.updateRefreshTokenInUser(refreshToken, payload.email);

		return {
			accessToken: await this.getAccesToken(payload),
			refreshToken,
		};
	}

	private async validateUser(userDto: CreateUserDto) {
		const user = await this.userService.getUserByEmail(userDto.email);

		if (!user) {
			throw new NotFoundException();
		}

		const passwordEquals = await bcrypt.compare(userDto.password, user.password);

		if (user && passwordEquals) {
			return user;
		}

		throw new UnauthorizedException({ message: 'Incorrect email or password' });
	}
}
