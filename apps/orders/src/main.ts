import { NestFactory } from '@nestjs/core';
import { getLoggerConfig } from '@config/config/logger.config';
import { Logtail } from '@logtail/node';

import { AppModule } from './app.module';
import { appConfigRegister } from './config/app.config';

import type { AppConfig } from './config/app.config';

async function bootstrap() {
	const logtail = new Logtail(process.env.LOGTAIL_TOKEN);

	const app = await NestFactory.create(AppModule, {
		logger: getLoggerConfig(logtail),
	});

	const { appPort } = app.get<AppConfig>(appConfigRegister.KEY);

	await app.listen(appPort, () => {
		console.log(`Orders service succesfully started at port ${appPort}`);
	});
}
void bootstrap();
