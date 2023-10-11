import { ObjectType, Directive, Field, ID, Int } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Directive('@key(fields: "id")')
@Entity('products')
export class Product {
	@Directive('@shareable')
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

	@Directive('@shareable')
	@Field()
	@Column()
	name: string;

	@Directive('@shareable')
	@Field((type) => Int)
	@Column('int')
	price: number;
}
