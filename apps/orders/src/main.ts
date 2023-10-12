import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { appConfigRegister } from './config/app.config';

import type { AppConfig } from './config/app.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const { appPort } = app.get<AppConfig>(appConfigRegister.KEY);

	await app.listen(appPort, () => {
		console.log(`Orders service succesfully started at port ${appPort}`);
	});
}
void bootstrap();
