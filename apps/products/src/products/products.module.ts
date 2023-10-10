import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';

import { Product } from '../entities/product.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Product])],
	providers: [ProductsRepository, ProductsService, ProductsResolver],
})
export class ProductsModule {}
