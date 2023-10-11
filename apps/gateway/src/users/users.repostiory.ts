import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';

import type { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UsersRepository {
	constructor(@InjectRepository(User) private readonly userEntity: Repository<User>) {}

	async save(user: User) {
		return await this.userEntity.save(user);
	}

	async create(dto: CreateUserDto) {
		return await this.userEntity.save(dto);
	}

	async getAll() {
		return await this.userEntity.find({ relations: { role: true, orders: true, cart: true } });
	}

	async getByEmail(email: string) {
		const user = await this.userEntity.findOne({
			where: { email },
			relations: { role: true, orders: true, cart: true },
		});

		return user;
	}

	async getByPrimaryKey(id: number) {
		return await this.userEntity.findOne({ where: { id }, relations: { role: true, orders: true, cart: true } });
	}
}
