import { Module } from '@nestjs/common';

import { PayPalService } from './paypal.service';
import { ConfigurableModuleClass } from './config/paypal.module.definition';

import type { ASYNC_OPTIONS_TYPE, OPTIONS_TYPE } from './config/paypal.module.definition';
import type { DynamicModule } from '@nestjs/common';

@Module({
	providers: [PayPalService],
	exports: [PayPalService],
})
export class PayPalModule extends ConfigurableModuleClass {
	static register(options: typeof OPTIONS_TYPE): DynamicModule {
		return {
			...super.register(options),
		};
	}

	static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
		return {
			...super.registerAsync(options),
		};
	}
}
