import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { UserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async register(userDto: UserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = new this.userModel({
      email: userDto.email,
      password: hashedPassword,
      role: userDto.role,
    });
    return user.save();
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      return user;
    }
    return null;
  }

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

  async update(id: string, newUser: UserDto): Promise<User> {
    try {
      const updatedArticle = await this.userModel.findByIdAndUpdate(
        id,
        newUser,
        { new: true },
      );
      return updatedArticle;
    } catch (error) {
      throw {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error updating article',
      };
    }
  }
}
