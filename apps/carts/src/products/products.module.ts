import { Module } from '@nestjs/common';
import { ProductsRepository } from 'apps/products/src/products/products.repository';

import { ProductsService } from './products.service';

@Module({
	providers: [ProductsService, ProductsRepository],
	exports: [ProductsService],
})
export class ProductsModule {}
