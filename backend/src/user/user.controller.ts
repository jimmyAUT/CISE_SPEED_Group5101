import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
  // UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { UserDto } from './user.dto';
// import { LocalAuthGuard } from 'src/auth/loaclAuth.guard';

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
  // @UseGuards(LocalAuthGuard)
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  //   @Get(':id')
  //   async findById(@Param('id') id: string): Promise<Article> {
  //     return this.articlesService.findById(id);
  //   }

  @Put(':id')
  // @UseGuards(LocalAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  // @UseGuards(LocalAuthGuard)
  async remove(@Param('id') id: string): Promise<User> {
    return this.userService.remove(id);
  }

  @Patch(':id')
  async updateScore(@Param('id') id: string, @Body('newRole') newRole: string) {
    try {
      const updatedUser = await this.userService.updateRole(id, newRole);
      return { message: 'Score updated successfully', user: updatedUser };
    } catch (error) {
      return { error: error.message };
    }
  }
}
