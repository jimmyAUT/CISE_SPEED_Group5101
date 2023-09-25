import { SearchRejected } from './searchRejected.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { RejectedController } from './rejected.controller';
import { RejectedService } from './rejected.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('RejectedController', () => {
  let app: INestApplication;

  const mockReviewService = {
    SearchRejected: jest.fn(),
    addRejected: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RejectedController],
      providers: [
        {
          provide: RejectedService,
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
