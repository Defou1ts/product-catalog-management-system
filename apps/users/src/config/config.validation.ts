import { createValidateFunction } from '@config/config';
import { IsNumber, IsString } from 'class-validator';

export class RequiredEnvironmentVariables {
	@IsNumber()
	USERS_PORT: number;

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
