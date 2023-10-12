import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';

import { ProductsRepository } from './products.repository';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

import { Product } from '../entities/product.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Product]), CacheModule.register()],
	providers: [ProductsRepository, ProductsService, ProductsResolver],
})
export class ProductsModule {}
