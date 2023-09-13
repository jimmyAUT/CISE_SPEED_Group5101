import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ArticleSchema } from 'src/articles/article.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }]),
  ],
  providers: [SearchService],
  controllers: [SearchController],
})
@Module({})
export class SearchModule {}
