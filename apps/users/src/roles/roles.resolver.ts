import { Args, Mutation, Query, ResolveReference, Resolver, ResolveField, Parent } from '@nestjs/graphql';

import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';

@Resolver(() => Role)
export class RolesResolver {
	constructor(private readonly roleSerive: RolesService) {}

	@Mutation(() => Role)
	async createRole(@Args('createRoleDto') dto: CreateRoleDto): Promise<Role> {
		return await this.roleSerive.createRole(dto);
	}

	@Query(() => Role)
	async getRoleByValue(@Args('value') value: string): Promise<Role> {
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
