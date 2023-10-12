import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
	constructor(
		@InjectRepository(User) private readonly userEntity: Repository<User>,
		@Inject(CACHE_MANAGER) private readonly cacheService: Cache,
	) {}

	async getById(id: number) {
		const cachedData = await this.cacheService.get<User>(String(id));
		if (cachedData) return cachedData;

		const user = await this.userEntity.findOne({
			where: { id },
			relations: { role: true, orders: true, cart: true },
		});

		await this.cacheService.set(String(id), user);

		return user;
	}

	async save(user: User) {
		return await this.userEntity.save(user);
	}

	async getAll() {
		const cachedData = await this.cacheService.get<User[]>('get-all-users');
		if (cachedData) return cachedData;

		const users = await this.userEntity.find({ relations: { role: true, orders: true, cart: true } });

		await this.cacheService.set('get-all-users', users);

		return users;
	}

	async getByEmail(email: string) {
		const cachedData = await this.cacheService.get<User>(email);
		if (cachedData) return cachedData;

		const user = await this.userEntity.findOne({
			where: { email },
			relations: { role: true, orders: true, cart: true },
		});

		await this.cacheService.set(email, user);
		return user;
	}
}
