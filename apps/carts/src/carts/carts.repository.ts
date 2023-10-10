import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cart } from '../entities/cart.entity';

@Injectable()
export class CartsRepository {
	constructor(@InjectRepository(Cart) private readonly cartsEntity: Repository<Cart>) {}

	async saveCart(cart: Cart) {
		await this.cartsEntity.save(cart);
	}

	async getById(id: number): Promise<Cart> {
		return await this.cartsEntity.findOne({ where: { id }, relations: { products: true } });
	}

	async removeById(id: number): Promise<number> {
		await this.cartsEntity.delete({ id });
		return id;
	}
}
