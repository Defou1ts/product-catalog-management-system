import { Controller, Get, Param, Post, Query, Redirect } from '@nestjs/common';

import { OrdersService } from './orders.service';

@Controller('payments')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Post('createPayment/:orderId')
	@Redirect()
	async processOrderPaymentByOrderId(@Param('orderId') orderId: number) {
		const payment = await this.ordersService.createOrderPaymentById(orderId);

		for (const link of payment.links) {
			if (link.rel === 'approval_url') {
				return link.href;
			}
		}
	}

	@Get('success')
	async successOrderPayment(
		@Query('PayerID') payerId: string,
		@Query('paymentId') paymentId: string,
		@Query('amount') amount: string,
	) {
		await this.ordersService.executeOrderPayment(paymentId, payerId, amount);
	}
}
