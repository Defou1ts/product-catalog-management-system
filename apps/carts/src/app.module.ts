import { postgresConfigRegister } from '@config/config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloFederationDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

import { validate } from './config/config.validation';
import { Product } from './entities/product.entity';
import { Cart } from './entities/cart.entity';

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
			load: [postgresConfigRegister],
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
				logging: true,
			}),
			inject: [postgresConfigRegister.KEY],
		}),
	],
})
export class AppModule {}
