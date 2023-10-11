import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);
	const port = configService.get('ORDERS_PORT');

	await app.listen(port, () => {
		console.log(`Orders service succesfully started at port ${port}`);
	});
}
void bootstrap();