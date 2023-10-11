import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CartsService } from './cart.service';

import { Cart } from '../entities/cart.entity';
import { Product } from '../entities/product.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Cart, Product])],
	providers: [CartsService],
	exports: [CartsService],
})
export class CartsModule {}
