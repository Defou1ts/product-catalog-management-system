import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

import type { TestingModule } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/ (GET)', async () => {
		return await request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
	});
});
