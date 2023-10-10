import { IsString } from 'class-validator';

export class SetRoleDto {
	@IsString()
	readonly value: string;

	@IsString()
	readonly userId: number;
}
