import { registerAs } from '@nestjs/config';

import type { ConfigType } from '@nestjs/config';

export const servicesConfigRegister = registerAs('services', () => ({
	gatewayServicePort: Number(process.env.GATEWAY_PORT),
	productsServiceHost: process.env.PRODUCTS_HOST,
	productsServicePort: Number(process.env.PRODUCTS_PORT),
}));

export type ServicesConfig = ConfigType<typeof servicesConfigRegister>;
