import { Test, TestingModule } from '@nestjs/testing';
import { RecordsService } from './records.service';
import * as data from '../../utils/mock/data.json';
describe('RecordsService', () => {
  let service: RecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecordsService],
    }).compile();

    service = module.get<RecordsService>(RecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Error if array Records is empty', () => {
    expect(() =>
      service.create({
        Records: [],
      }),
    ).toThrow('Records can not be empty!!!');
  });
  it('should return array records objects', () => {
    const result = service.create(data);
    expect(result).toHaveLength(1);
  });

  it('should create records with valid input', () => {
    const result = service.create(data);
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty('spam', true);
    expect(result[0]).toHaveProperty('virus', true);
    expect(result[0]).toHaveProperty('dns', true);
    expect(result[0]).toHaveProperty('retrasado', false);
    expect(result[0]).toHaveProperty('mes', 'September');
    expect(result[0]).toHaveProperty(
      'emisor',
      '61967230-7A45-4A9D-BEC9-87CBCF2211C9',
    );
    expect(result[0]).toHaveProperty('receptor');
    expect(result[0].receptor).toHaveLength(1);
  });

  it('Validate if emisor and receptor not have domain', () => {
    const result = service.create(data);
    const whitoutDomain1 = '61967230-7A45-4A9D-BEC9-87CBCF2211C9';
    const whitoutDomain2 = 'recipient';

    expect(result[0]).toHaveProperty('emisor');
    expect(result[0].emisor).toBe(whitoutDomain1);
    expect(result[0].receptor[0]).toBe(whitoutDomain2);
  });
});
