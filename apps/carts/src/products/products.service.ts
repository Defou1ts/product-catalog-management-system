import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
	constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

	async getProductById(id: number): Promise<Product> {
		return await this.productRepository.findOneBy({ id });
	}
}
