import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { servicesConfigRegister } from './config/services.config';

import type { ServicesConfig } from './config/services.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const { gatewayServicePort } = app.get<ServicesConfig>(servicesConfigRegister.KEY);

	await app.listen(gatewayServicePort, () => {
		console.log(`Gateway succesfully started at port ${gatewayServicePort}`);
	});
}
void bootstrap();
