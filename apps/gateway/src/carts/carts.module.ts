import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsService } from 'apps/carts/src/carts/carts.service';

import { Cart } from '../entities/cart.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Cart])],
	providers: [CartsService],
	exports: [CartsService],
})
export class CartsModule {}
