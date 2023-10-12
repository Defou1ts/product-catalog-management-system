import { registerAs } from '@nestjs/config';

import type { ConfigType } from '@nestjs/config';

export const serviceConfigRegister = registerAs('service-config', () => ({
	usersServicePort: Number(process.env.USERS_PORT),
}));

export type ServiceConfig = ConfigType<typeof serviceConfigRegister>;
