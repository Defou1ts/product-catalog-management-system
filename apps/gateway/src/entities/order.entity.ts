import {
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import { User } from './user.entity';
import { Product } from './product.entity';

@Entity('orders')
export class Order {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@ManyToMany(() => Product)
	@JoinTable()
	products: Product[];

	@ManyToOne(() => User, (user) => user.orders)
	user: User;
}
