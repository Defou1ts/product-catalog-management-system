import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
	constructor(@Inject(User) private readonly userEntity: Repository<User>) {}

	async getById(id: number) {
		return await this.userEntity.findOne({ where: { id }, relations: { role: true, orders: true, cart: true } });
	}

	async save(user: User) {
		return await this.userEntity.save(user);
	}

	async getAll() {
		return await this.userEntity.find({ relations: { role: true, orders: true, cart: true } });
	}

	async getByEmail(email: string) {
		return await this.userEntity.findOne({
			where: { email },
			relations: { role: true, orders: true, cart: true },
		});
	}
}
