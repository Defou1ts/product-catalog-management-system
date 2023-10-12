import { registerAs } from '@nestjs/config';

import type { ConfigType } from '@nestjs/config';

export const redisConfigRegister = registerAs('redis', () => ({
	host: process.env.REDIS_HOST,
	port: Number(process.env.REDIS_PORT),
}));

export type RedisConfig = ConfigType<typeof redisConfigRegister>;
