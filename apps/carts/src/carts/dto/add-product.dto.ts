import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class AddProductDto {
	@Field(() => Int)
	@IsNumber()
	productId: number;

	@Field(() => Int)
	@IsNumber()
	cartId: number;
}
