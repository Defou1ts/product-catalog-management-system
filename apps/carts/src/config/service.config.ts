import { registerAs } from '@nestjs/config';

import type { ConfigType } from '@nestjs/config';

export const serviceConfigRegister = registerAs('service-config', () => ({
	cartsServicePort: Number(process.env.CARTS_PORT),
}));

export type ServiceConfig = ConfigType<typeof serviceConfigRegister>;
