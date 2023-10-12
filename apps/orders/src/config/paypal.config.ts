import { registerAs } from '@nestjs/config';

import type { ConfigType } from '@nestjs/config';

export const paypalConfigRegister = registerAs('paypal', () => ({
	paypalClientId: process.env.PAYPAL_CLIENT_ID,
	paypalClientSecret: process.env.PAYPAL_CLIENT_SECRET,
}));

export type PaypalConfig = ConfigType<typeof paypalConfigRegister>;
