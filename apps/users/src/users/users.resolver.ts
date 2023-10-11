import { Args, Mutation, Query, ResolveReference, Resolver, ResolveField, Parent } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { SetRoleDto } from './dto/set-role.dto';

import { User } from '../entities/user.entity';
import { Cart } from '../entities/cart.entity';
import { Order } from '../entities/order.entity';
import { Role } from '../entities/role.entity';

@Resolver(() => User)
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Query(() => [User])
	async getAllUsers(): Promise<User[]> {
		return await this.usersService.getAllUsers();
	}

	@Query(() => User)
	async getUserByEmail(@Args('email') email: string): Promise<User> {
		return await this.usersService.getUserByEmail(email);
	}

	@Mutation(() => User)
	async setRoleForUser(@Args('setRoleDto') dto: SetRoleDto) {
		return await this.usersService.setRole(dto);
	}

	@ResolveReference()
	async resolveReference(reference: { __typename: string; id: number }) {
		return await this.usersService.getUserById(reference.id);
	}

	@ResolveField((of) => Cart)
	public async cart(@Parent() user: User): Promise<Cart> {
		const foundUser = await this.usersService.getUserById(user.id);
		return foundUser.cart;
	}

	@ResolveField((of) => [Order])
	public async orders(@Parent() user: User): Promise<Order[]> {
		const foundUser = await this.usersService.getUserById(user.id);
		return foundUser.orders;
	}

	@ResolveField((of) => Role)
	public async role(@Parent() user: User): Promise<Role> {
		const foundUser = await this.usersService.getUserById(user.id);
		return foundUser.role;
	}
}
