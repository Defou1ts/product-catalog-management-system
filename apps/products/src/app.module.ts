import { postgresConfigRegister, redisConfigRegister } from '@config/config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloFederationDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';

import { validate } from './config/config.validation';
import { Product } from './entities/product.entity';
import { ProductsModule } from './products/products.module';

import type { PostgresConfig, RedisConfig } from '@config/config';
import type { ApolloFederationDriverConfig } from '@nestjs/apollo';

@Module({
	imports: [
		CacheModule.registerAsync({
			imports: [ConfigModule],
			useFactory: ({ host, port }: RedisConfig) => ({
				ttl: 1000,
				isGlobal: true,
				store: redisStore,
				host,
				port,
				name: 'products',
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
			load: [postgresConfigRegister, redisConfigRegister],
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
				entities: [Product],
				synchronize: true,
				autoLoadEntities: true,
				logging: ['error', 'migration'],
			}),
			inject: [postgresConfigRegister.KEY],
		}),
		ProductsModule,
	],
})
export class AppModule {}
