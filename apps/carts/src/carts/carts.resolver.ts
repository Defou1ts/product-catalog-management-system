import { Args, Int, Mutation, Parent, Query, ResolveField, ResolveReference, Resolver } from '@nestjs/graphql';

import { CartsService } from './carts.service';
import { AddProductDto } from './dto/add-product.dto';

import { Cart } from '../entities/cart.entity';
import { Product } from '../entities/product.entity';

@Resolver(() => Cart)
export class CartsResolver {
	constructor(private readonly cartsService: CartsService) {}

	@Query(() => Cart)
	async getCartById(@Args('id') id: number): Promise<Cart> {
		return await this.cartsService.getById(id);
	}

	@Mutation(() => Int)
	async removeCartById(@Args('id') id: number): Promise<number> {
		return await this.cartsService.removeById(id);
	}

	@Mutation(() => Cart)
	async addProductToCart(@Args('addProductDto') dto: AddProductDto): Promise<Cart> {
		return await this.cartsService.addProduct(dto);
	}

	@Mutation(() => Cart)
	async removeProductFromCart(@Args('removeProductDto') dto: AddProductDto): Promise<Cart> {
		return await this.cartsService.addProduct(dto);
	}

	@ResolveReference()
	async resolveReference(reference: { __typename: string; id: number }) {
		return await this.cartsService.getById(reference.id);
	}

	@ResolveField((of) => [Product])
	public async products(@Parent() cart: Cart): Promise<Product[]> {
		return await this.cartsService.getProductsByCartId(cart.id);
	}
}
