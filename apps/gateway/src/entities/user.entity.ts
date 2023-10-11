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

import { Cart } from './cart.entity';
import { Order } from './order.entity';
import { Role } from './role.entity';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column({ nullable: true })
	hashedRefreshToken: string;

	@CreateDateColumn()
	createdAt: Date;

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
