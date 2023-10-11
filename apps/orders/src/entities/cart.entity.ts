import { CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Directive, Field, ID } from '@nestjs/graphql';

import { Product } from './product.entity';

@ObjectType()
@Directive('@key(fields: "id")')
@Entity('carts')
export class Cart {
	@Field(() => ID)
	@Directive('@shareable')
	@PrimaryGeneratedColumn()
	id: number;

	@Field(() => Date)
	@Directive('@shareable')
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => Date)
	@Directive('@shareable')
	@UpdateDateColumn()
	updatedAt: Date;

	@ManyToMany(() => Product)
	@JoinTable()
	products: Product[];
}
