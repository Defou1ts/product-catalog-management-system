import { Inject, Injectable } from '@nestjs/common';
import paypal from 'paypal-rest-sdk';

import { MODULE_OPTIONS_TOKEN, PaypalModuleOptions } from './config/paypal.module.definition';

import { AppConfig, appConfigRegister } from '../config/app.config';

import type { PaymentResponse, Payment } from 'paypal-rest-sdk';

@Injectable()
export class PayPalService {
	constructor(
		@Inject(appConfigRegister.KEY) private readonly appConfig: AppConfig,
		@Inject(MODULE_OPTIONS_TOKEN) { mode, clientId, clientSecret }: PaypalModuleOptions,
	) {
		paypal.configure({
			mode,
			client_id: clientId,
			client_secret: clientSecret,
		});
	}

	async createPayment(payment: Payment) {
		let createdPayment: PaymentResponse;

		paypal.payment.create(payment, (error, payment) => {
			if (error) {
				throw new Error(error.message);
			}
			createdPayment = payment;
		});

		return createdPayment;
	}

	async executePayment(paymentId: string, executeRequest: paypal.payment.ExecuteRequest) {
		let execetuedPayment: PaymentResponse;
		paypal.payment.execute(paymentId, executeRequest, (error, payment) => {
			if (error) {
				throw new Error(error.message);
			}
			execetuedPayment = payment;
		});

		return execetuedPayment;
	}
}
