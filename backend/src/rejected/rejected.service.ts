import { Rejected } from './rejected.schema';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRejectedDto } from './create-rejected.dto';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { SearchRejected } from './searchRejected.dto';

@Injectable()
export class RejectedService {
  constructor(
    @InjectModel('Rejected') private readonly rejectedModel: Model<Rejected>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async create(createRejectedDto: CreateRejectedDto): Promise<Rejected> {
    try {
      const createdRejected = new this.rejectedModel(createRejectedDto);
      return await createdRejected.save();
    } catch (error) {
      throw {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error creating article',
      };
    }
  }

  async findAll(): Promise<Rejected[]> {
    try {
      return await this.rejectedModel.find().exec();
    } catch (error) {
      throw {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error retrieving articles',
      };
    }
  }

  async findByDoi(searchRejected: SearchRejected): Promise<Rejected[]> {
    const { keyword, doi } = searchRejected;
    let query: any = { title: { $regex: keyword, $options: 'i' } };
    if (doi) {
      query = { ...query, doi: { $regex: doi } };
    }
    try {
      const rejecteds = await this.rejectedModel.find(query).exec();
      return rejecteds;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<Rejected> {
    try {
      const rejected = await this.rejectedModel.findById(id).exec();
      if (!rejected) {
        throw { status: HttpStatus.NOT_FOUND, message: 'Article not found' };
      }
      return rejected;
    } catch (error) {
      throw {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error retrieving article',
      };
    }
  }

  async update(
    id: string,
    updateRejected: CreateRejectedDto,
  ): Promise<Rejected> {
    try {
      const updated = await this.rejectedModel.findByIdAndUpdate(
        id,
        updateRejected,
        { new: true },
      );
      if (!updated) {
        throw { status: HttpStatus.NOT_FOUND, message: 'Article not found' };
      }
      return updated;
    } catch (error) {
      throw {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error updating article',
      };
    }
  }

  async remove(id: string): Promise<Rejected> {
    try {
      const removedRejected = await this.rejectedModel.findByIdAndRemove(id);
      if (!removedRejected) {
        throw { status: HttpStatus.NOT_FOUND, message: 'Article not found' };
      }
      return removedRejected;
    } catch (error) {
      throw {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error removing article',
      };
    }
  }
}
