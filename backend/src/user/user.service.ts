import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
// import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  // async create(createArticleDto: CreateArticleDto): Promise<Article> {
  //   try {
  //     const createdArticle = new this.articleModel(createArticleDto);
  //     return await createdArticle.save();
  //   } catch (error) {
  //     throw {
  //       status: HttpStatus.INTERNAL_SERVER_ERROR,
  //       message: 'Error creating article',
  //     };
  //   }
  // }

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error retrieving articles',
      };
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const removedUser = await this.userModel.findByIdAndRemove(id);
      if (!removedUser) {
        throw { status: HttpStatus.NOT_FOUND, message: 'User not found' };
      }
      return removedUser;
    } catch (error) {
      throw {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error removing user',
      };
    }
  }

  // async findById(id: string): Promise<Article> {
  //   try {
  //     const article = await this.articleModel.findById(id).exec();
  //     if (!article) {
  //       throw { status: HttpStatus.NOT_FOUND, message: 'Article not found' };
  //     }
  //     return article;
  //   } catch (error) {
  //     throw {
  //       status: HttpStatus.INTERNAL_SERVER_ERROR,
  //       message: 'Error retrieving article',
  //     };
  //   }
  // }

  // async update(id: string, updateUserDto: CreateUserDto): Promise<User> {
  //   try {
  //     const updatedUser = await this.userModel.findByIdAndUpdate(
  //       id,
  //       updateUserDto,
  //       { new: true },
  //     );
  //     if (!updatedUser) {
  //       throw { status: HttpStatus.NOT_FOUND, message: 'User not found' };
  //     }
  //     return updatedUser;
  //   } catch (error) {
  //     throw {
  //       status: HttpStatus.INTERNAL_SERVER_ERROR,
  //       message: 'Error updating User',
  //     };
  //   }
  // }
}
