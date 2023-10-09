import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateProductDto {
	@IsNumber()
	@Field(() => ID)
	id: number;

	@IsOptional()
	@IsString()
	@Field({ nullable: true })
	name: string;

	@IsOptional()
	@IsNumber()
	@Field(() => Number, { nullable: true })
	price: number;
}
