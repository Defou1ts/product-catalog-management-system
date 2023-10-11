import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Directive, Field, ID } from '@nestjs/graphql';

import { Cart } from './cart.entity';
import { Order } from './order.entity';
import { Role } from './role.entity';

@ObjectType()
@Directive('@key(fields: "id")')
@Entity('users')
export class User {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	email: string;

	@Field()
	@Column()
	password: string;

	@Field()
	@Column()
	hashedRefreshToken: string;

	@Field(() => Date)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => Date)
	@UpdateDateColumn()
	updatedAt: Date;

	@Field((type) => Cart)
	@OneToOne(() => Cart)
	@JoinColumn()
	cart: Cart;

	@Field((type) => [Order])
	@OneToMany(() => Order, (order) => order.user)
	orders: Order[];

	@Field((type) => Role)
	@ManyToOne(() => Role, (role) => role.users)
	role: Role;
}
