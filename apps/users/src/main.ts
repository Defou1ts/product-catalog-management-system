import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { serviceConfigRegister } from './config/service.config';

import type { ServiceConfig } from './config/service.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const { usersServicePort } = app.get<ServiceConfig>(serviceConfigRegister.KEY);

	await app.listen(usersServicePort, () => {
		console.log(`Users service succesfully started at port ${usersServicePort}`);
	});
}
void bootstrap();
