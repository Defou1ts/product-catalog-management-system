import { registerAs } from '@nestjs/config';

import type { ConfigType } from '@nestjs/config';

export const postgresConfigRegister = registerAs('postgres', () => ({
	host: process.env.POSTGRES_HOST,
	port: Number(process.env.POSTGRES_PORT),
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
}));

export type PostgresConfig = ConfigType<typeof postgresConfigRegister>;
