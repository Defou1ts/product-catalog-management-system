import { postgresConfigRegister, redisConfigRegister } from '@config/config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloFederationDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

import { validate } from './config/config.validation';
import { UsersModule } from './users/users.module';
import { Cart } from './entities/cart.entity';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { RolesModule } from './roles/roles.module';
import { serviceConfigRegister } from './config/service.config';

import type { ApolloFederationDriverConfig } from '@nestjs/apollo';
import type { PostgresConfig, RedisConfig } from '@config/config';

@Module({
	imports: [
		CacheModule.registerAsync({
			isGlobal: true,
			imports: [ConfigModule],
			useFactory: ({ host, port }: RedisConfig) => ({
				isGlobal: true,
				ttl: 1000,
				store: redisStore,
				host,
				port,
				name: 'users',
			}),
			inject: [redisConfigRegister.KEY],
		}),
		GraphQLModule.forRoot<ApolloFederationDriverConfig>({
			driver: ApolloFederationDriver,
			autoSchemaFile: {
				federation: 2,
			},
		}),
		ConfigModule.forRoot({
			isGlobal: true,
			load: [postgresConfigRegister, redisConfigRegister, serviceConfigRegister],
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
		UsersModule,
		RolesModule,
	],
})
export class AppModule {}
