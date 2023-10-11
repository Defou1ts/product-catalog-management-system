import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';

import { Order } from '../entities/order.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Order])],
	providers: [OrdersRepository, OrdersService, OrdersResolver],
})
export class OrdersModule {}
