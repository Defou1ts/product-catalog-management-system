import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { serviceConfigRegister } from './config/service.config';

import type { ServiceConfig } from './config/service.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const { cartsServicePort } = app.get<ServiceConfig>(serviceConfigRegister.KEY);

	await app.listen(cartsServicePort, () => {
		console.log(`Carts service succesfully started at port ${cartsServicePort}`);
	});
}
void bootstrap();
