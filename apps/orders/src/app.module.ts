import { postgresConfigRegister } from '@config/config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloFederationDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

import { validate } from './config/config.validation';
import { Cart } from './entities/cart.entity';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { OrdersModule } from './orders/orders.module';
import { appConfigRegister } from './config/app.config';
import { paypalConfigRegister } from './config/paypal.config';

import type { ApolloFederationDriverConfig } from '@nestjs/apollo';
import type { PostgresConfig } from '@config/config';

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloFederationDriverConfig>({
			driver: ApolloFederationDriver,
			autoSchemaFile: {
				federation: 2,
			},
		}),
		ConfigModule.forRoot({
			isGlobal: true,
			load: [postgresConfigRegister, appConfigRegister, paypalConfigRegister],
			validate,
		}),
		TypeOrmModule.forRootAsync({
			useFactory: ({ host, port, username, password, database }: PostgresConfig) => ({
				type: 'postgres',
				host,
				port,
				username,
				password,
				database,
				entities: [Cart, Order, Product, User, Role],
				synchronize: true,
				autoLoadEntities: true,
				logging: ['error', 'migration'],
			}),
			inject: [postgresConfigRegister.KEY],
		}),
		OrdersModule,
	],
})
export class AppModule {}
