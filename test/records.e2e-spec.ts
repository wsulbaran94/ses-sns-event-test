import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RecordsController } from '../src/modules/records/records.controller';
import { RecordsService } from '../src/modules/records/records.service';
import {
  CreateRecordDto,
  CreateRecordResponseDto,
} from '../src/modules/records/dto/create-record.dto';
import * as data from '../src/utils/mock/data.json';

describe('RecordsController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [RecordsController],
      providers: [RecordsService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('create', () => {
    it('should return created records', async () => {
      const createRecordDto: CreateRecordDto = data;

      const response = await request(app.getHttpServer())
        .post('/records')
        .send(createRecordDto)
        .expect(201);

      const createdRecords: CreateRecordResponseDto[] = response.body;
      expect(createdRecords).toBeDefined();
      expect(createdRecords).toHaveLength(1);
    });
    it('should return error 400 for invalid input', async () => {
      const invalidCreateRecordDto: CreateRecordDto = { Records: [] };

      const response = await request(app.getHttpServer())
        .post('/records')
        .send(invalidCreateRecordDto)
        .expect(HttpStatus.BAD_REQUEST);

      expect(response.body.message).toBe('Records can not be empty!!!');
    });
  });
});
