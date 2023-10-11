import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsService } from 'apps/carts/src/carts/carts.service';

import { Cart } from '../entities/cart.entity';
import { Product } from '../entities/product.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Cart, Product])],
	providers: [CartsService],
	exports: [CartsService],
})
export class CartsModule {}
