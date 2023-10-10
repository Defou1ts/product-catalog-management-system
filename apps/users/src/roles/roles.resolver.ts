import { Args, Mutation, Query, ResolveReference, Resolver } from '@nestjs/graphql';

import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

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
}
