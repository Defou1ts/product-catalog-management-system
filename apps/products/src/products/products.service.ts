import { Injectable } from '@nestjs/common';

import { ProductsRepository } from './products.repository';

import type { CreateProductDto } from './dto/create-product.dto';
import type { UpdateProductDto } from './dto/update-product.dto';
import type { Product } from '@entities/entities';

@Injectable()
export class ProductsService {
	constructor(private readonly productsRepository: ProductsRepository) {}

	async create(dto: CreateProductDto): Promise<Product> {
		return await this.productsRepository.create(dto);
	}

	async getAll(): Promise<Product[]> {
		return await this.productsRepository.getAll();
	}

	async getById(id: number): Promise<Product> {
		return await this.productsRepository.getById(id);
	}

	async update(dto: UpdateProductDto): Promise<Product> {
		return await this.productsRepository.updateById(dto);
	}

	async removeById(id: number): Promise<number> {
		return await this.productsRepository.removeById(id);
	}
}
