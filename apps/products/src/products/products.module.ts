import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsRepository } from './products.repository';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

import { Product } from '../entities/product.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Product])],
	providers: [ProductsRepository, ProductsService, ProductsResolver],
})
export class ProductsModule {}
