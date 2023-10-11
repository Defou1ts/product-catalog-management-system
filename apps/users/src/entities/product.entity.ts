import { ObjectType, Directive, Field, ID, Int } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Directive('@shareable')
@Directive('@key(fields: "id")')
@Entity('products')
export class Product {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field(() => Date)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => Date)
	@UpdateDateColumn()
	updatedAt: Date;

	@Field()
	@Column()
	name: string;

	@Field((type) => Int)
	@Column('int')
	price: number;
}
