import { Args, Int, Mutation, Query, ResolveReference, Resolver } from '@nestjs/graphql';

import { CartsService } from './carts.service';

import { Cart } from '../entities/cart.entity';

@Resolver(() => Cart)
export class CartsResolver {
	constructor(private readonly cartsService: CartsService) {}

	@Query(() => Cart)
	async getById(@Args('id') id: number): Promise<Cart> {
		return await this.cartsService.getById(id);
	}

	@Mutation(() => Int)
	async removeById(@Args('id') id: number): Promise<number> {
		return await this.cartsService.removeById(id);
	}

	@ResolveReference()
	async resolveReference(reference: { __typename: string; id: number }) {
		return await this.cartsService.getById(reference.id);
	}
}
