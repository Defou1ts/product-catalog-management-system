import { Injectable, NotFoundException } from '@nestjs/common';

import { CartsRepository } from './carts.repository';

import type { Product } from '../entities/product.entity';
import type { Cart } from '../entities/cart.entity';

@Injectable()
export class CartsService {
	constructor(private readonly cartsRepository: CartsRepository) {}

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
