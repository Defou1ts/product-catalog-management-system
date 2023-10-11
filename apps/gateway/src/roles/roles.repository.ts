import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from '../entities/role.entity';

import type { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesRepository {
	constructor(@InjectRepository(Role) private readonly rolesEntity: Repository<Role>) {}

	async create(dto: CreateRoleDto) {
		return await this.rolesEntity.save(dto);
	}

	async getByValue(value: string) {
		return await this.rolesEntity.findOne({ where: { value } });
	}

	async getById(id: number) {
		return await this.rolesEntity.findOne({ where: { id } });
	}
}
