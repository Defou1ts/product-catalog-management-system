import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Directive, Field, ID } from '@nestjs/graphql';

import { User } from './user.entity';

@ObjectType()
@Directive('@key(fields: "id")')
@Entity('roles')
export class Role {
	@Directive('@shareable')
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Directive('@shareable')
	@Field()
	@Column()
	value: string;

	@OneToMany(() => User, (user) => user.role)
	users: User[];
}
