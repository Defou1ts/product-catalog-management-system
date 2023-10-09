import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@entities/entities';

import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';

@Module({
	imports: [TypeOrmModule.forFeature([Product])],
	providers: [ProductsRepository, ProductsService, ProductsResolver],
})
export class ProductsModule {}
