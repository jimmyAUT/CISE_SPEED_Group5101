import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Submit } from './submit.schema';
// import { SearchDto } from 'src/search/search.dto';

@Injectable()
export class SubmitService {
  constructor(
    @InjectModel('Submit') private readonly submitModel: Model<Submit>,
  ) {}

  async create(newSubmit: any): Promise<Submit> {
    try {
      const createdArticle = new this.submitModel(newSubmit);
      return await createdArticle.save();
    } catch (error) {
      throw {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error creating article',
      };
    }
  }

  async findAll(): Promise<Submit[]> {
    try {
      return await this.submitModel.find().exec();
    } catch (error) {
      throw {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error retrieving articles',
      };
    }
  }

  async findById(id: string): Promise<Submit> {
    try {
      const article = await this.submitModel.findById(id).exec();
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

  async update(id: string, newSubmit: any): Promise<Submit> {
    try {
      const updatedArticle = await this.submitModel.findByIdAndUpdate(
        id,
        newSubmit,
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

  async remove(id: string): Promise<Submit> {
    try {
      const removedArticle = await this.submitModel.findByIdAndRemove(id);
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

  async searchSubmit(query: any): Promise<Submit[]> {
    // const { status } = query;
    // const newQuery: any = { status: status };
    try {
      const articles = await this.submitModel.find(query).exec();
      return articles;
    } catch (error) {
      throw error;
    }
  }
}
