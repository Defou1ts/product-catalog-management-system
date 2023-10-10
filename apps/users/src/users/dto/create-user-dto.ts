import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
	@IsString()
	@IsEmail()
	readonly email: string;

	@IsString()
	@Length(4, 16, { message: 'more 4 and less 16' })
	readonly password: string;
}
