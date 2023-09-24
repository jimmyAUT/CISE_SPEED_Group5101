import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from 'src/search/search.service';
import { SearchRejected } from 'src/rejected/searchRejected.dto';
import { RejectedService } from 'src/rejected/rejected.service';
import { ReviewController } from './review.controller';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('ReviewController', () => {
  let app: INestApplication;

  const mockReviewService = {
    SearchRejected: jest.fn(),
    addRejected: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [
        {
          provide: RejectedService,SearchService
          useValue: mockReviewService,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /review/search', () => {
    it('should return a list of reviews', async () => {
      const keyword = 'SPEED';

      mockReviewService.searchReviews.mockResolvedValue([
        // Your mock review data here
      ]);

      const response = await request(app.getHttpServer())
        .get('/review/search')
        .query({ keyword });

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        // Your expected response data here
      ]);
    });
  });

  describe('POST /review', () => {
    it('should add a new review', async () => {
      const newReview = {
        title: 'Sample Title',
        authors: 'Sample Authors',
        source: 'Sample Source',
        pubyear: '2023',
        doi: 'Sample DOI',
      };

      mockReviewService.addReview.mockResolvedValue(newReview);

      const response = await request(app.getHttpServer())
        .post('/review')
        .send(newReview);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newReview);
    });
  });
});

describe('RejectedController', () => {
  let controller: RejectedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RejectedController],
    }).compile();

    controller = module.get<RejectedController>(RejectedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
