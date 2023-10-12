import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
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
import { JwtAuthMiddleware } from './auth/middlewares/jwt-auth.middleware';
import { getApolloGatewayDriverConfig } from './helpers/getAppoloGatewayDriverConfig';

import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
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
				logging: ['error', 'migration'],
			}),
			inject: [postgresConfigRegister.KEY],
		}),
		GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
			driver: ApolloGatewayDriver,
			useFactory: getApolloGatewayDriverConfig,
			inject: [servicesConfigRegister.KEY],
		}),
		UsersModule,
		RolesModule,
		JwtAuthModule,
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(JwtAuthMiddleware).forRoutes('graphql');
	}
}
