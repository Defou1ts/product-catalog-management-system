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
@Directive('@shareable')
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

	@ManyToMany(() => Product)
	@JoinTable()
	products: Product[];

	@ManyToOne(() => User, (user) => user.orders)
	user: User;
}
