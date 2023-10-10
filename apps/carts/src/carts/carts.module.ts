import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CartsRepository } from './carts.repository';
import { CartsResolver } from './carts.resolver';
import { CartsService } from './carts.service';

import { ProductsResolver } from '../products/products.resolver';
import { Cart } from '../entities/cart.entity';
import { Product } from '../entities/product.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Cart, Product])],
	providers: [CartsResolver, ProductsResolver, CartsService, CartsRepository],
})
export class CartsModule {}
