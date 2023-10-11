import { Field, InputType, Int } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class SetRoleDto {
	@Field()
	@IsString()
	readonly value: string;

	@Field(() => Int)
	@IsString()
	readonly userId: number;
}
