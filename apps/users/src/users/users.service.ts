import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UNKNOWN_USER_EXCEPTION, UNKNOWN_USER_ROLE_EXCEPTION } from './constants/user-exceptions';
import { UsersRepository } from './users.repostiory';

import { RolesService } from '../roles/roles.service';

import type { SetRoleDto } from './dto/set-role.dto';

@Injectable()
export class UsersService {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly roleService: RolesService,
	) {}

	async getAllUsers() {
		return await this.usersRepository.getAll();
	}

	async getUserByEmail(email: string) {
		return await this.usersRepository.getByEmail(email);
	}

	async getUserById(id: number) {
		return await this.usersRepository.getById(id);
	}

	async setRole(dto: SetRoleDto) {
		const user = await this.usersRepository.getById(dto.userId);
		const role = await this.roleService.getRoleByValue(dto.value);

		if (!role) {
			throw new HttpException(UNKNOWN_USER_ROLE_EXCEPTION, HttpStatus.NOT_FOUND);
		}

		if (!user) {
			throw new HttpException(UNKNOWN_USER_EXCEPTION, HttpStatus.NOT_FOUND);
		}

		user.role = role;
		await this.usersRepository.save(user);
		return dto;
	}
}
