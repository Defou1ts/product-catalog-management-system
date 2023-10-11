import { createValidateFunction } from '@config/config';
import { IsNumber, IsString } from 'class-validator';

export class RequiredEnvironmentVariables {
	@IsNumber()
	GATEWAY_PORT: number;

	@IsNumber()
	PRODUCTS_PORT: number;

	@IsString()
	PRODUCTS_HOST: string;

	@IsNumber()
	USERS_PORT: number;

	@IsString()
	USERS_HOST: string;

	@IsNumber()
	ORDERS_PORT: number;

	@IsString()
	ORDERS_HOST: string;

	@IsString()
	POSTGRES_HOST: string;

	@IsNumber()
	POSTGRES_PORT: number;

	@IsString()
	POSTGRES_USER: string;

	@IsString()
	POSTGRES_PASSWORD: string;

	@IsString()
	POSTGRES_DB: string;

	@IsString()
	JWT_ACCESS_TOKEN_SECRET: string;

	@IsNumber()
	JWT_ACCESS_TOKEN_EXPIRATION_TIME: number;

	@IsString()
	JWT_REFRESH_TOKEN_SECRET: string;

	@IsNumber()
	JWT_REFRESH_TOKEN_EXPIRATION_TIME: number;

	@IsNumber()
	SALT: number;
}

export const validate = createValidateFunction(RequiredEnvironmentVariables);
