import { Module } from '@nestjs/common';
import { RejectedService } from 'src/rejected/rejected.service';
import { SearchService } from 'src/search/search.service';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from 'src/articles/article.schema';
import { RejectedSchema } from 'src/rejected/rejected.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Article', schema: ArticleSchema },
      { name: 'Rejected', schema: RejectedSchema },
    ]),
  ],
  providers: [RejectedService, SearchService],
  controllers: [ReviewController],
})
export class ReviewModule {}
