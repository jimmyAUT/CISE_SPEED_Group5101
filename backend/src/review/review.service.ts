/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from '../articles/article.schema';
import { Submit } from 'src/submit/submit.schema';
@Injectable()
export class ReviewService {
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
    @InjectModel('Submit') private readonly submitModel: Model<Submit>,
  ) {}
  // ... other methods ...
  async findByDOI(doi: string): Promise<Article | null> {
    return this.articleModel.findOne({ doi }).exec();
  }
  async saveArticle(articleData: any): Promise<Submit> {
    const newArticle = new this.submitModel(articleData);
    newArticle.status = 'unreview';
    return newArticle.save();
  }
  async getAllArticles(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }
}
