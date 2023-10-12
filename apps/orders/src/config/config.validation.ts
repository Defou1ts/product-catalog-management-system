import { createValidateFunction } from '@config/config';
import { IsNumber, IsString } from 'class-validator';

export class RequiredEnvironmentVariables {
	@IsString()
	PAYPAL_CLIENT_ID: string;

	@IsString()
	PAYPAL_CLIENT_SECRET: string;

	@IsString()
	APP_HOST: string;

	@IsNumber()
	ORDERS_PORT: number;

	@IsString()
	REDIS_HOST: string;

	@IsNumber()
	REDIS_PORT: number;

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
}

export const validate = createValidateFunction(RequiredEnvironmentVariables);
