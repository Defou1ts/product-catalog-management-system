import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersRepository {
	constructor(
		@InjectRepository(Order) private readonly ordersEntity: Repository<Order>,
		@Inject(CACHE_MANAGER) private readonly cacheService: Cache,
	) {}

	async create() {
		return await this.ordersEntity.save({});
	}

	async save(order: Order) {
		return await this.ordersEntity.save(order);
	}

	async getById(id: number) {
		const cachedData = await this.cacheService.get<Order>(String(id));
		if (cachedData) return cachedData;

		const order = await this.ordersEntity.findOne({ where: { id }, relations: { products: true, user: true } });

		await this.cacheService.set(String(id), order);

		return order;
	}
}
