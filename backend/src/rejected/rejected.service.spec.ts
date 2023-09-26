import { Test, TestingModule } from '@nestjs/testing';
import { RejectedService } from './rejected.service';

describe('RejectedService', () => {
  let service: RejectedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RejectedService],
    }).compile();

    service = module.get<RejectedService>(RejectedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
