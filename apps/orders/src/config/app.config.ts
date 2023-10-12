import { registerAs } from '@nestjs/config';

import type { ConfigType } from '@nestjs/config';

export const appConfigRegister = registerAs('app', () => ({
	appHost: process.env.APP_HOST,
}));

export type AppConfig = ConfigType<typeof appConfigRegister>;
