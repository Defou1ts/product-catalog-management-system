import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CartsRepository } from './carts.repository';
import { CartsResolver } from './carts.resolver';
import { CartsService } from './carts.service';

import { Cart } from '../entities/cart.entity';
import { Product } from '../entities/product.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Cart, Product])],
	providers: [CartsResolver, CartsService, CartsRepository],
})
export class CartsModule {}
