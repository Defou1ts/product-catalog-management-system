import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver } from '@nestjs/apollo';
import { postgresConfigRegister } from '@config/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { validate } from './config/config.validation';
import { servicesConfigRegister } from './config/services.config';
import { encryptionConfigRegister } from './config/encryption.config';
import { jwtConfigRegister } from './config/jwt.config';
import { JwtAuthModule } from './auth/jwt-auth.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { Cart } from './entities/cart.entity';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';

import type { PostgresConfig } from '@config/config';
import type { ApolloGatewayDriverConfig } from '@nestjs/apollo';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validate,
			load: [servicesConfigRegister, encryptionConfigRegister, jwtConfigRegister, postgresConfigRegister],
		}),
		TypeOrmModule.forRootAsync({
			useFactory: ({ host, port, username, password, database }: PostgresConfig) => ({
				type: 'postgres',
				host,
				port,
				username,
				password,
				database,
				entities: [User, Role, Cart, Order, Product],
				synchronize: true,
				autoLoadEntities: true,
				logging: true,
			}),
			inject: [postgresConfigRegister.KEY],
		}),
		GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
			driver: ApolloGatewayDriver,
			gateway: {
				supergraphSdl: new IntrospectAndCompose({
					subgraphs: [
						{
							name: 'Products',
							url: `http://${process.env.PRODUCTS_HOST}:${process.env.PRODUCTS_PORT}/graphql`,
						},
						{
							name: 'Carts',
							url: `http://${process.env.CARTS_HOST}:${process.env.CARTS_PORT}/graphql`,
						},
						{
							name: 'Users',
							url: `http://${process.env.USERS_HOST}:${process.env.USERS_PORT}/graphql`,
						},
						{
							name: 'Orders',
							url: `http://${process.env.ORDERS_HOST}:${process.env.ORDERS_PORT}/graphql`,
						},
					],
				}),
			},
		}),
		UsersModule,
		RolesModule,
		JwtAuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
