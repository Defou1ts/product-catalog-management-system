import { registerAs } from '@nestjs/config';

import type { ConfigType } from '@nestjs/config';

export const serviceConfigRegister = registerAs('service-config', () => ({
	productsServicePort: Number(process.env.PRODUCTS_PORT),
}));

export type ServiceConfig = ConfigType<typeof serviceConfigRegister>;
