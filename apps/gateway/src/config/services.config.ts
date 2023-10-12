import { registerAs } from '@nestjs/config';

import type { ConfigType } from '@nestjs/config';

export const servicesConfigRegister = registerAs('services', () => ({
	gatewayServicePort: Number(process.env.GATEWAY_PORT),
	productsServiceHost: process.env.PRODUCTS_HOST,
	productsServicePort: Number(process.env.PRODUCTS_PORT),
	cartsServiceHost: process.env.CARTS_HOST,
	cartsServicePort: Number(process.env.CARTS_PORT),
	usersServiceHost: process.env.USERS_HOST,
	usersServicePort: Number(process.env.USERS_PORT),
	ordersServiceHost: process.env.ORDERS_HOST,
	ordersServicePort: Number(process.env.ORDERS_PORT),
}));

export type ServicesConfig = ConfigType<typeof servicesConfigRegister>;
