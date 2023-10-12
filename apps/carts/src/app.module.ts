import { postgresConfigRegister, redisConfigRegister } from '@config/config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloFederationDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

import { validate } from './config/config.validation';
import { Product } from './entities/product.entity';
import { Cart } from './entities/cart.entity';
import { CartsModule } from './carts/carts.module';
import { serviceConfigRegister } from './config/service.config';

import type { PostgresConfig, RedisConfig } from '@config/config';
import type { ApolloFederationDriverConfig } from '@nestjs/apollo';

@Module({
	imports: [
		CacheModule.registerAsync({
			isGlobal: true,
			imports: [ConfigModule],
			useFactory: ({ host, port }: RedisConfig) => ({
				ttl: 1000,
				isGlobal: true,
				store: redisStore,
				host,
				port,
				name: 'carts',
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
				entities: [Cart, Product],
				synchronize: true,
				autoLoadEntities: true,
				logging: ['error', 'migration'],
			}),
			inject: [postgresConfigRegister.KEY],
		}),
		CartsModule,
	],
})
export class AppModule {}
