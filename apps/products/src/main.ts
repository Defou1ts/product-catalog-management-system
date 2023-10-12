import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { serviceConfigRegister } from './config/service.config';

import type { ServiceConfig } from './config/service.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const { productsServicePort } = app.get<ServiceConfig>(serviceConfigRegister.KEY);

	await app.listen(productsServicePort, () => {
		console.log(`Products service succesfully started at port ${productsServicePort}`);
	});
}
void bootstrap();
