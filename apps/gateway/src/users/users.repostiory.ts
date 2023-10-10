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
		return this.userEntity.create(dto);
	}

	async getAll() {
		return await this.userEntity.find({ relations: { role: true } });
	}

	async getByEmail(email: string) {
		return await this.userEntity.findOne({
			where: { email },
			relations: { role: true },
		});
	}

	async getByPrimaryKey(id: number) {
		return await this.userEntity.findOneBy({ id });
	}
}
