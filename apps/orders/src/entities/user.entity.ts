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
	@Directive('@shareable')
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Directive('@shareable')
	@Field()
	@Column()
	email: string;

	@Directive('@shareable')
	@Field()
	@Column()
	password: string;

	@Directive('@shareable')
	@Field()
	@Column({ nullable: true })
	hashedRefreshToken: string;

	@Directive('@shareable')
	@Field(() => Date)
	@CreateDateColumn()
	createdAt: Date;

	@Directive('@shareable')
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
