import { registerAs } from '@nestjs/config';

import type { ConfigType } from '@nestjs/config';

export const appConfigRegister = registerAs('app', () => ({
	appHost: process.env.APP_HOST,
	appPort: process.env.ORDERS_PORT,
}));

export type AppConfig = ConfigType<typeof appConfigRegister>;
