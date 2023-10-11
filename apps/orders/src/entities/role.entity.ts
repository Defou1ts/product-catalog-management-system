import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Directive, Field, ID } from '@nestjs/graphql';

import { User } from './user.entity';

@ObjectType()
@Directive('@key(fields: "id")')
@Entity('roles')
export class Role {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	value: string;

	@Field((type) => [User])
	@OneToMany(() => User, (user) => user.role)
	users: User[];
}
