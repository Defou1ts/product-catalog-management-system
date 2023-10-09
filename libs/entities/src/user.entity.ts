import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	email: string;

	@Column()
	password: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToOne(() => Cart)
	@JoinColumn()
	cart: Cart;

	@OneToMany(() => Order, (order) => order.user)
	orders: Order[];
}
