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
@Directive('@shareable')
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
	@Column({ nullable: true })
	hashedRefreshToken: string;

	@Field(() => Date)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => Date)
	@UpdateDateColumn()
	updatedAt: Date;

	@OneToOne(() => Cart)
	@JoinColumn()
	cart: Cart;

	@OneToMany(() => Order, (order) => order.user)
	orders: Order[];

	@ManyToOne(() => Role, (role) => role.users)
	role: Role;
}
