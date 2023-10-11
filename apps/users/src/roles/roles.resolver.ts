import { Args, Mutation, Query, ResolveReference, Resolver, ResolveField, Parent } from '@nestjs/graphql';

import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';

@Resolver('Role')
export class RolesResolver {
	constructor(private readonly roleSerive: RolesService) {}

	@Mutation('createRole')
	async createRole(@Args('createRoleDto') dto: CreateRoleDto) {
		return await this.roleSerive.createRole(dto);
	}

	@Query('getRoleByValue')
	async getByValue(@Args('value') value: string) {
		return await this.roleSerive.getRoleByValue(value);
	}

	@ResolveReference()
	async resolveReference(reference: { __typename: string; id: number }) {
		return await this.roleSerive.getRoleById(reference.id);
	}

	@ResolveField((of) => [User])
	public async users(@Parent() role: Role): Promise<User[]> {
		const foundRole = await this.roleSerive.getRoleById(role.id);
		return foundRole.users;
	}
}
