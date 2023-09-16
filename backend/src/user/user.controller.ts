import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  //   Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() userDto: UserDto) {
    try {
      const user = await this.userService.register(userDto);
      return user;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  //   @Get(':id')
  //   async findById(@Param('id') id: string): Promise<Article> {
  //     return this.articlesService.findById(id);
  //   }

  //   @Put(':id')
  //   async update(
  //     @Param('id') id: string,
  //     @Body() updateUserDto: CreateUserDto,
  //   ): Promise<User> {
  //     return this.userService.update(id, updateUserDto);
  //   }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return this.userService.remove(id);
  }
}
