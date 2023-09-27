import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from '../articles/article.schema';

@Injectable()
export class ReviewService {
    constructor(@InjectModel('Article') private readonly articleModel: Model<Article>) {}
    // ... other methods ...
    async findByDOI(doi: string): Promise<Article | null> {
        return this.articleModel.findOne({ doi }).exec();
    }
    async saveArticle(articleData: any): Promise<Article> {
        const newArticle = new this.articleModel(articleData);
        newArticle.status = 'pendings';
        return newArticle.save();
    }
    async getAllArticles(): Promise<Article[]> {
        return this.articleModel.find().exec();
    }
    
}

