import { Injectable } from '@nestjs/common';

import { OrdersRepository } from './orders.repository';

import type { Order } from '../entities/order.entity';
import type { User } from '../entities/user.entity';

@Injectable()
export class OrdersService {
	constructor(private readonly ordersRepository: OrdersRepository) {}

	async createOrder(user: User): Promise<Order> {
		const order = await this.ordersRepository.create();
		const cart = user.cart;
		const products = cart.products;

		order.products = products;
		await this.ordersRepository.save(order);

		return order;
	}

	async getOrderById(id: number): Promise<Order> {
		return await this.ordersRepository.getById(id);
	}
}
