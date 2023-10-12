import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { Product } from '../entities/product.entity';

import type { CreateProductDto } from './dto/create-product.dto';
import type { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsRepository {
	constructor(
		@InjectRepository(Product) private readonly productsEntity: Repository<Product>,
		@Inject(CACHE_MANAGER) private readonly cacheService: Cache,
	) {}

	async create(dto: CreateProductDto): Promise<Product> {
		return await this.productsEntity.save(dto);
	}

	async getAll(): Promise<Product[]> {
		const cachedData = await this.cacheService.get<Product[]>('get-all-products');
		if (cachedData) return cachedData;

		const products = await this.productsEntity.find();

		await this.cacheService.set('get-all-products', products);

		return products;
	}

	async getById(id: number): Promise<Product> {
		const cachedData = await this.cacheService.get<Product>(String(id));
		if (cachedData) return cachedData;

		const products = await this.productsEntity.findOneBy({ id });

		await this.cacheService.set(String(id), products);

		return products;
	}

	async updateById(dto: UpdateProductDto): Promise<Product> {
		const { id } = dto;
		await this.productsEntity.update({ id }, dto);
		return await this.productsEntity.findOneBy({ id });
	}

	async removeById(id: number): Promise<number> {
		await this.productsEntity.delete({ id });
		return id;
	}
}
