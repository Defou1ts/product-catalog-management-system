import { CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Directive, Field, ID } from '@nestjs/graphql';

import { Product } from './product.entity';

@ObjectType()
@Directive('@key(fields: "id")')
@Entity('carts')
export class Cart {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Directive('@shareable')
	@Field(() => Date)
	@CreateDateColumn()
	createdAt: Date;

	@Directive('@shareable')
	@Field(() => Date)
	@UpdateDateColumn()
	updatedAt: Date;

	@Field((type) => [Product])
	@ManyToMany(() => Product)
	@JoinTable()
	products: Product[];
}
