import {
  Controller,
  Get,
  //   Post,
  //   Body,
  Param,
  //   Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { CreateUserDto } from './create-user.dto';
import { User } from './user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //   @Post()
  //   async create(@Body() createArticleDto: CreateUserDto): Promise<User> {
  //     return this.articlesService.create(createArticleDto);
  //   }

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
