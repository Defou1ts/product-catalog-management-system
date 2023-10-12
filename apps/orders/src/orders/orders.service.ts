import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { OrdersRepository } from './orders.repository';

import { PayPalService } from '../paypal/paypal.service';
import { appConfigRegister, AppConfig } from '../config/app.config';

import type { Order } from '../entities/order.entity';
import type { User } from '../entities/user.entity';

@Injectable()
export class OrdersService {
	constructor(
		private readonly ordersRepository: OrdersRepository,
		private readonly payPalService: PayPalService,
		@Inject(appConfigRegister.KEY) private readonly appConfig: AppConfig,
	) {}

	async createOrderPaymentById(id: number) {
		const order = await this.ordersRepository.getById(id);
		if (!order) {
			throw new NotFoundException();
		}
		const { products } = order;
		const paymentItems = products.map(({ name, price }) => ({
			name,
			price: String(price),
			currency: 'USD',
			quantity: 1,
		}));
		const totalPrice = String(products.reduce((prev, current) => prev + current.price, 0));

		const payment = await this.payPalService.createPayment({
			intent: 'sale',
			payer: {
				payment_method: 'paypal',
			},
			redirect_urls: {
				return_url: `http://${this.appConfig.appHost}:${this.appConfig.appPort}/payments/success?amount=${totalPrice}`,
			},
			transactions: [
				{
					item_list: {
						items: paymentItems,
					},
					amount: {
						currency: 'USD',
						total: totalPrice,
					},
					description: 'Order Payment',
				},
			],
		});

		return payment;
	}

	async executeOrderPayment(paymentId: string, payerId: string, amount: string) {
		const executeRequest = {
			payer_id: payerId,
			transactions: [
				{
					amount: {
						currency: 'USD',
						total: amount,
					},
				},
			],
		};

		await this.payPalService.executePayment(paymentId, executeRequest);
	}

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
