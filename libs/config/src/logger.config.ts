import { LogtailTransport } from '@logtail/winston';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';

import type { Logtail } from '@logtail/node';
import type { LoggerService } from '@nestjs/common';

export const getLoggerConfig = (logtail: Logtail): LoggerService => {
	return WinstonModule.createLogger({
		transports: [
			new LogtailTransport(logtail, {
				format: format.combine(
					format.cli(),
					format.splat(),
					format.timestamp(),
					format.printf((info) => {
						return `${info.timestamp} ${info.level}: ${info.message}`;
					}),
				),
			}),
			new transports.File({
				filename: `logs/error.log`,
				level: 'error',
				format: format.combine(format.timestamp(), format.json()),
			}),
			new transports.File({
				filename: `logs/combined.log`,
				format: format.combine(format.timestamp(), format.json()),
			}),
			new transports.Console({
				format: format.combine(
					format.cli(),
					format.splat(),
					format.timestamp(),
					format.printf((info) => {
						return `${info.timestamp} ${info.level}: ${info.message}`;
					}),
				),
			}),
		],
	});
};
