import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersRepository {
	constructor(@InjectRepository(Order) private readonly ordersEntity: Repository<Order>) {}

	async create() {
		return await this.ordersEntity.save({});
	}

	async save(order: Order) {
		return await this.ordersEntity.save(order);
	}

	async getById(id: number) {
		return await this.ordersEntity.findOne({ where: { id }, relations: { products: true, user: true } });
	}
}
