import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { Role } from '../entities/role.entity';

import type { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesRepository {
	constructor(
		@InjectRepository(Role) private readonly rolesEntity: Repository<Role>,
		@Inject(CACHE_MANAGER) private readonly cacheService: Cache,
	) {}

	async create(dto: CreateRoleDto) {
		return await this.rolesEntity.save(dto);
	}

	async getByValue(value: string) {
		const cachedData = await this.cacheService.get<Role>(value);
		if (cachedData) return cachedData;

		const role = await this.rolesEntity.findOne({ where: { value }, relations: { users: true } });

		await this.cacheService.set(value, role);
		return role;
	}

	async getById(id: number) {
		const cachedData = await this.cacheService.get<Role>(String(id));
		if (cachedData) return cachedData;

		const role = await this.rolesEntity.findOne({ where: { id }, relations: { users: true } });

		await this.cacheService.set(String(id), role);
		return role;
	}
}
