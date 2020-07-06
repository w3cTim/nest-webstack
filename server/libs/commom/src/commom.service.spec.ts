import { Test, TestingModule } from '@nestjs/testing';
import { CommomService } from './commom.service';

describe('CommomService', () => {
  let service: CommomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommomService],
    }).compile();

    service = module.get<CommomService>(CommomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
