import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import type { ClassConstructor } from 'class-transformer';

export function createValidateFunction<T extends object>(EnvironmentVariables: ClassConstructor<T>) {
	return function validate(config: Record<string, unknown>) {
		const validatedConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true });
		const errors = validateSync(validatedConfig, { skipMissingProperties: false });

		if (errors.length > 0) {
			throw new Error(errors.toString());
		}
		return validatedConfig;
	};
}
