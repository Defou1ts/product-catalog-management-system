import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver } from '@nestjs/apollo';

import { validate } from './config/config.validation';
import { servicesConfigRegister } from './config/services.config';

import type { ApolloGatewayDriverConfig } from '@nestjs/apollo';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validate,
			load: [servicesConfigRegister],
		}),
		GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
			driver: ApolloGatewayDriver,
			gateway: {
				supergraphSdl: new IntrospectAndCompose({
					subgraphs: [
						{
							name: 'Product',
							url: `http://${process.env.PRODUCTS_HOST}:${process.env.PRODUCTS_PORT}/graphql`,
						},
						{
							name: 'Cart',
							url: `http://${process.env.CARTS_HOST}:${process.env.CARTS_PORT}/graphql`,
						},
					],
				}),
			},
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
