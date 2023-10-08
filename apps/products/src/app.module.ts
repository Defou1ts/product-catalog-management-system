import { postgresConfigRegister } from '@config/config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from './config/config.validation';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [postgresConfigRegister],
			validate,
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
