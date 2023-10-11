import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { servicesConfigRegister } from './config/services.config';
import { ClassValidationPipe } from './pipes/class-validation.pipe';

import type { ServicesConfig } from './config/services.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const { gatewayServicePort } = app.get<ServicesConfig>(servicesConfigRegister.KEY);

	app.useGlobalPipes(new ClassValidationPipe());

	await app.listen(gatewayServicePort, () => {
		console.log(`Gateway succesfully started at port ${gatewayServicePort}`);
	});
}
void bootstrap();
