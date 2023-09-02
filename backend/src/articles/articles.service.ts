import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './article.schema';
import { CreateArticleDto } from './create-article.dto';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    try {
      const createdArticle = new this.articleModel(createArticleDto);
      return await createdArticle.save();
    } catch (error) {
      throw {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error creating article',
      };
    }
  }

  async findAll(): Promise<Article[]> {
    try {
      return await this.articleModel.find().exec();
    } catch (error) {
      throw {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error retrieving articles',
      };
    }
  }

  async findById(id: string): Promise<Article> {
    try {
      const article = await this.articleModel.findById(id).exec();
      if (!article) {
        throw { status: HttpStatus.NOT_FOUND, message: 'Article not found' };
      }
      return article;
    } catch (error) {
      throw {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error retrieving article',
      };
    }
  }

  async update(
    id: string,
    updateArticleDto: CreateArticleDto,
  ): Promise<Article> {
    try {
      const updatedArticle = await this.articleModel.findByIdAndUpdate(
        id,
        updateArticleDto,
        { new: true },
      );
      if (!updatedArticle) {
        throw { status: HttpStatus.NOT_FOUND, message: 'Article not found' };
      }
      return updatedArticle;
    } catch (error) {
      throw {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error updating article',
      };
    }
  }

  async remove(id: string): Promise<Article> {
    try {
      const removedArticle = await this.articleModel.findByIdAndRemove(id);
      if (!removedArticle) {
        throw { status: HttpStatus.NOT_FOUND, message: 'Article not found' };
      }
      return removedArticle;
    } catch (error) {
      throw {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error removing article',
      };
    }
  }
}
