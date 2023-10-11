import { CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Directive, Field, ID } from '@nestjs/graphql';

import { Product } from './product.entity';

@ObjectType()
@Directive('@key(fields: "id")')
@Directive('@shareable')
@Entity('carts')
export class Cart {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field(() => Date)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => Date)
	@UpdateDateColumn()
	updatedAt: Date;

	@Field((type) => [Product])
	@ManyToMany(() => Product)
	@JoinTable()
	products: Product[];
}
