import { NestFactory } from '@nestjs/core';
import { Logtail } from '@logtail/node';
import { getLoggerConfig } from '@config/config/logger.config';

import { AppModule } from './app.module';
import { serviceConfigRegister } from './config/service.config';

import type { ServiceConfig } from './config/service.config';

async function bootstrap() {
	const logtail = new Logtail(process.env.LOGTAIL_TOKEN);

	const app = await NestFactory.create(AppModule, {
		logger: getLoggerConfig(logtail),
	});

	const { productsServicePort } = app.get<ServiceConfig>(serviceConfigRegister.KEY);

	await app.listen(productsServicePort, () => {
		console.log(`Products service succesfully started at port ${productsServicePort}`);
	});
}
void bootstrap();
