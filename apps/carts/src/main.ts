import { NestFactory } from '@nestjs/core';
import { getLoggerConfig } from '@config/config/logger.config';
import { Logtail } from '@logtail/node';

import { AppModule } from './app.module';
import { serviceConfigRegister } from './config/service.config';

import type { ServiceConfig } from './config/service.config';

async function bootstrap() {
	const logtail = new Logtail(process.env.LOGTAIL_TOKEN);
	const app = await NestFactory.create(AppModule, {
		logger: getLoggerConfig(logtail),
	});

	const { cartsServicePort } = app.get<ServiceConfig>(serviceConfigRegister.KEY);

	await app.listen(cartsServicePort, () => {
		console.log(`Carts service succesfully started at port ${cartsServicePort}`);
	});
}
void bootstrap();
