import { Injectable } from '@nestjs/common';
import { UserRoles } from '@auth/auth';

import { RolesRepository } from './roles.repository';

import type { OnModuleInit } from '@nestjs/common';
import type { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService implements OnModuleInit {
	constructor(private readonly rolesRepository: RolesRepository) {}

	async onModuleInit() {
		const userRole = await this.rolesRepository.getByValue(UserRoles.USER);
		const adminRole = await this.rolesRepository.getByValue(UserRoles.ADMIN);

		if (!userRole) {
			await this.createRole({
				value: UserRoles.USER,
			});
		}

		if (!adminRole) {
			await this.createRole({
				value: UserRoles.ADMIN,
			});
		}
	}

	async createRole(dto: CreateRoleDto) {
		const role = await this.rolesRepository.create(dto);
		return role;
	}

	async getRoleByValue(value: string) {
		const role = await this.rolesRepository.getByValue(value);

		return role;
	}

	async getRoleById(id: number) {
		return await this.rolesRepository.getById(id);
	}
}
