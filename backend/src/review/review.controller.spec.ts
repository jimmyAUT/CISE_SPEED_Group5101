import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';
import { RejectedService } from 'src/rejected/rejected.service';
import { SearchService } from 'src/search/search.service';
import { CreateRejectedDto } from 'src/rejected/create-rejected.dto';
import { SearchRejected } from 'src/rejected/searchRejected.dto';
import { SearchDto } from 'src/search/search.dto';
import { Rejected } from 'src/rejected/rejected.schema';

describe('ReviewController', () => {
  let reviewController: ReviewController;
  let rejectedService: RejectedService;
  let searchService: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [RejectedService, SearchService],
    }).compile();

    reviewController = module.get<ReviewController>(ReviewController);
    rejectedService = module.get<RejectedService>(RejectedService);
    searchService = module.get<SearchService>(SearchService);
  });

  it('should be defined', () => {
    expect(reviewController).toBeDefined();
  });

  describe('create', () => {
    it('should create a rejected entry', async () => {
      const createRejectedDto: CreateRejectedDto = {
        title:
          'An experimental evaluation of test driven development vs. test-last development with industry professionals',
        authors: 'Munir, H., Wnuk, K., Petersen, K., Moayyed, M.',
        source: 'EASE',
        pubyear: '2014',
        doi: 'https://doi.org/10.1145/2601248.2601267',
        comment: 'test',
      };

      const createdRejected: Rejected = {
        title: 'Test Article',
        authors: 'Test Author',
        source: 'Test Source',
        pubyear: '2022',
        doi: 'https://doi.org/10.12345/test-doi',
        comment: 'Test Comment',
      };

      jest
        .spyOn(rejectedService, 'create')
        .mockImplementation(async () => createdRejected);

      const result = await reviewController.create(createRejectedDto);

      expect(result).toBe(createdRejected);
    });
  });

  describe('searchRejected', () => {
    it('should search rejected entries by DOI', async () => {
      const searchDto: SearchRejected = {
        doi: '10.1145',
      };

      const foundRejected: Rejected[] = [
        // 模拟找到的数据
      ];

      jest
        .spyOn(rejectedService, 'findByDoi')
        .mockImplementation(async () => foundRejected);

      const result = await reviewController.SearchRejected(searchDto);

      expect(result).toBe(foundRejected);
    });
  });

  describe('searchAll', () => {
    it('should search all entries', async () => {
      const foundRejected: Rejected[] = [
        // 模拟找到的数据
      ];

      jest
        .spyOn(rejectedService, 'findAll')
        .mockImplementation(async () => foundRejected);

      const result = await reviewController.searchAll();

      expect(result).toBe(foundRejected);
    });
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });
});
