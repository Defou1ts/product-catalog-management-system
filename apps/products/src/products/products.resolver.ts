import { Args, Int, Mutation, Query, ResolveReference, Resolver } from '@nestjs/graphql';

import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

import { Product } from '../entities/product.entity';

@Resolver(() => Product)
export class ProductsResolver {
	constructor(private readonly productsService: ProductsService) {}

	@Query(() => [Product])
	async getAllProducts(): Promise<Product[]> {
		return await this.productsService.getAll();
	}

	@Query(() => Product)
	async getProductById(@Args('id') id: number): Promise<Product> {
		return await this.productsService.getById(id);
	}

	@Mutation(() => Product)
	async createProduct(@Args('createProduct') dto: CreateProductDto): Promise<Product> {
		return await this.productsService.create(dto);
	}

	@Mutation(() => Product)
	async updateProduct(@Args('updateProduct') dto: UpdateProductDto): Promise<Product> {
		return await this.productsService.update(dto);
	}

	@Mutation(() => Int)
	async removeProduct(@Args('id') id: number): Promise<number> {
		return await this.productsService.removeById(id);
	}

	@ResolveReference()
	async resolveReference(reference: { __typename: string; id: number }) {
		return await this.productsService.getById(reference.id);
	}
}
