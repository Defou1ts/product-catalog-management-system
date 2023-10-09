import { postgresConfigRegister } from '@config/config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@entities/entities';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

import { validate } from './config/config.validation';
import { ProductsModule } from './products/products.module';

import type { ApolloDriverConfig } from '@nestjs/apollo';
import type { PostgresConfig } from '@config/config';

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: 'schema.gql',
			sortSchema: true,
			playground: true,
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
				entities: [Product],
				synchronize: true,
				autoLoadEntities: true,
				logging: true,
			}),
			inject: [postgresConfigRegister.KEY],
		}),
		ProductsModule,
	],
})
export class AppModule {}
