import { createValidateFunction } from '@config/config';
import { IsNumber, IsString } from 'class-validator';

export class RequiredEnvironmentVariables {
	@IsNumber()
	GATEWAY_PORT: number;

	@IsNumber()
	PRODUCTS_PORT: number;

	@IsString()
	PRODUCTS_HOST: string;
}

export const validate = createValidateFunction(RequiredEnvironmentVariables);
