import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Product } from '../entities/product.entity';
import { Cart } from '../entities/cart.entity';
import { CartsService } from '../carts/carts.service';

@Resolver((of) => Product)
export class ProductsResolver {
	constructor(private readonly cartsService: CartsService) {}

	@ResolveField((of) => [Product])
	public async products(@Parent() cart: Cart): Promise<Product[]> {
		return await this.cartsService.getProductsByCartId(cart.id);
	}
}
