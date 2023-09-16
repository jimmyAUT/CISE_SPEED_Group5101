import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from '../articles/article.schema';
import { SearchDto } from 'src/search/search.dto';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
  ) {}
  async searchAll() {
    try {
      const article = await this.articleModel.find().exec();
      return article;
    } catch (error) {
      throw error;
    }
  }
  async searchArticles(searchDto: SearchDto): Promise<Article[]> {
    const { keyword, year } = searchDto;
    let query: any = { title: { $regex: keyword, $options: 'i' } };

    if (year) {
      query = { ...query, pubyear: { $regex: year } };
    }
    try {
      const articles = await this.articleModel.find(query).exec();
      return articles;
    } catch (error) {
      throw error;
    }
  }
}
