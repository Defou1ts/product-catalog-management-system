import { Injectable, NotFoundException } from '@nestjs/common';

import { CartsRepository } from './carts.repository';

import { ProductsService } from '../products/products.service';

import type { AddProductDto } from './dto/add-product.dto';
import type { Product } from '../entities/product.entity';
import type { Cart } from '../entities/cart.entity';

@Injectable()
export class CartsService {
	constructor(
		private readonly cartsRepository: CartsRepository,
		private readonly productsService: ProductsService,
	) {}

	async addProduct(dto: AddProductDto): Promise<Cart> {
		const cart = await this.cartsRepository.getById(dto.cartId);
		const product = await this.productsService.getProductById(dto.productId);

		if (!cart || !product) {
			throw new NotFoundException();
		}

		cart.products.push(product);
		await this.cartsRepository.saveCart(cart);

		return cart;
	}

	async removeProduct(dto: AddProductDto): Promise<Cart> {
		const cart = await this.cartsRepository.getById(dto.cartId);
		const product = await this.productsService.getProductById(dto.productId);

		if (!cart || !product) {
			throw new NotFoundException();
		}

		cart.products = cart.products.filter((prod) => prod.id !== product.id);
		await this.cartsRepository.saveCart(cart);

		return cart;
	}

	async getById(id: number): Promise<Cart> {
		return await this.cartsRepository.getById(id);
	}

	async removeById(id: number): Promise<number> {
		return await this.cartsRepository.removeById(id);
	}

	async getProductsByCartId(id: number): Promise<Product[]> {
		const cart = await this.cartsRepository.getById(id);
		if (!cart) {
			throw new NotFoundException();
		}
		return cart.products;
	}
}
