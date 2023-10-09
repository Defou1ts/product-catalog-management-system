import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateProductDto {
	@IsString()
	@Field()
	name: string;

	@IsNumber()
	@Field(() => Number)
	price: number;
}
