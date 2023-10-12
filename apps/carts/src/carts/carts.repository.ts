import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { Cart } from '../entities/cart.entity';

@Injectable()
export class CartsRepository {
	constructor(
		@InjectRepository(Cart) private readonly cartsEntity: Repository<Cart>,
		@Inject(CACHE_MANAGER) private readonly cacheService: Cache,
	) {}

	async saveCart(cart: Cart) {
		await this.cartsEntity.save(cart);
	}

	async getById(id: number): Promise<Cart> {
		const cachedData = await this.cacheService.get<Cart>(String(id));
		if (cachedData) return cachedData;

		const cart = await this.cartsEntity.findOne({ where: { id }, relations: { products: true } });

		await this.cacheService.set(String(id), cart);

		return cart;
	}

	async removeById(id: number): Promise<number> {
		await this.cartsEntity.delete({ id });
		return id;
	}
}
