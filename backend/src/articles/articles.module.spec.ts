import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from './articles.module';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { ArticleSchema } from './article.schema';
import * as dotenv from 'dotenv';

dotenv.config();
const mongoDB = process.env.mongoDB;
describe('ArticlesModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongoDB),
        MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }]),
        ArticlesModule,
      ],
      controllers: [ArticlesController],
      providers: [ArticlesService],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  afterAll(async () => {
    await module.close();
  });
});
