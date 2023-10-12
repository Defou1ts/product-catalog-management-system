import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';

import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { OrdersController } from './orders.controller';

import { Order } from '../entities/order.entity';
import { PayPalModule } from '../paypal/paypal.module';
import { paypalConfigRegister } from '../config/paypal.config';

import type { PaypalConfig } from '../config/paypal.config';

@Module({
	imports: [
		CacheModule.register(),
		TypeOrmModule.forFeature([Order]),
		PayPalModule.registerAsync({
			useFactory: ({ paypalClientId, paypalClientSecret }: PaypalConfig) => ({
				mode: 'sandbox',
				clientId: paypalClientId,
				clientSecret: paypalClientSecret,
			}),
			inject: [paypalConfigRegister.KEY],
		}),
	],
	providers: [OrdersRepository, OrdersService, OrdersResolver],
	controllers: [OrdersController],
})
export class OrdersModule {}
