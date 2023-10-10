import { Args, Resolver } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { SetRoleDto } from './dto/set-role.dto';

@Resolver('User')
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	async create(@Args('createUserDto') userDto: CreateUserDto) {
		return await this.usersService.createUser(userDto);
	}

	async getAll() {
		return await this.usersService.getAllUsers();
	}

	async setRole(@Args('setRoleDto') dto: SetRoleDto) {
		return await this.usersService.setRole(dto);
	}
}
