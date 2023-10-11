import {
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Directive, Field, ID } from '@nestjs/graphql';

import { User } from './user.entity';
import { Product } from './product.entity';

@ObjectType()
@Directive('@key(fields: "id")')
@Entity('orders')
export class Order {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field(() => Date)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => Date)
	@UpdateDateColumn()
	updatedAt: Date;

	@Field(() => [Product])
	@ManyToMany(() => Product)
	@JoinTable()
	products: Product[];

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.orders)
	user: User;
}
