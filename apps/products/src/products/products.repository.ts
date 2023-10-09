import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Product } from '../entities/product.entity';

import type { CreateProductDto } from './dto/create-product.dto';
import type { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsRepository {
	constructor(@InjectRepository(Product) private readonly productsEntity: Repository<Product>) {}

	async create(dto: CreateProductDto): Promise<Product> {
		return await this.productsEntity.save(dto);
	}

	async getAll(): Promise<Product[]> {
		return await this.productsEntity.find();
	}

	async getById(id: number): Promise<Product> {
		return await this.productsEntity.findOneBy({ id });
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
