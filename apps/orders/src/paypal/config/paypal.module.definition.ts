import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface PaypalModuleOptions {
	mode: 'sandbox' | 'live';
	clientId: string;
	clientSecret: string;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE, ASYNC_OPTIONS_TYPE } =
	new ConfigurableModuleBuilder<PaypalModuleOptions>().build();
