import { Args, Mutation, Parent, Query, ResolveField, ResolveReference, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '@auth/auth';
import { Response } from 'express';

import { OrdersService } from './orders.service';

import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { Product } from '../entities/product.entity';
import { GraphQLResponse } from '../decorators/request.decorator';

@Resolver(() => Order)
export class OrdersResolver {
	constructor(private readonly ordersService: OrdersService) {}

	@Query(() => Order)
	async startOrderPayment(@GraphQLResponse() res: Response) {
		console.log(res.req);
		res.redirect('http://google.com');
		return { id: 1 };
	}

	@Mutation(() => Order)
	async createOrder(@CurrentUser() user: User) {
		return await this.ordersService.createOrder(user);
	}

	@Query(() => Order)
	async getOrderById(@Args('id') id: number): Promise<Order> {
		return await this.ordersService.getOrderById(id);
	}

	@ResolveReference()
	async resolveReference(reference: { __typename: string; id: number }) {
		return await this.ordersService.getOrderById(reference.id);
	}

	@ResolveField(() => [Product])
	async products(@Parent() order: Order): Promise<Product[]> {
		return order.products;
	}

	@ResolveField(() => User)
	async user(@Parent() order: Order): Promise<User> {
		return order.user;
	}
}
