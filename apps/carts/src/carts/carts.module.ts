import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';

import { CartsRepository } from './carts.repository';
import { CartsResolver } from './carts.resolver';
import { CartsService } from './carts.service';

import { Cart } from '../entities/cart.entity';
import { Product } from '../entities/product.entity';
import { ProductsModule } from '../products/products.module';

@Module({
	imports: [TypeOrmModule.forFeature([Cart, Product]), ProductsModule, CacheModule.register({})],
	providers: [CartsResolver, CartsService, CartsRepository],
})
export class CartsModule {}
