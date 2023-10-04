import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { Rejected } from './rejected.schema';
import { CreateRejectedDto } from './create-rejected.dto';
import { RejectedService } from './rejected.service';
import { SearchRejected } from './searchRejected.dto';

@Controller('rejected')
export class RejectedController {
  constructor(private readonly rejectedService: RejectedService) {}

  @Post()
  async create(
    @Body() createRejectedDto: CreateRejectedDto,
  ): Promise<Rejected> {
    return this.rejectedService.create(createRejectedDto);
  }

  @Get()
  async findAll(): Promise<Rejected[]> {
    return this.rejectedService.findAll();
  }

  @Post('search-rejected')
  async searchArticles(@Body() searchDto: SearchRejected) {
    return this.rejectedService.findByDoi(searchDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Rejected> {
    return this.rejectedService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRejected: CreateRejectedDto,
  ): Promise<Rejected> {
    return this.rejectedService.update(id, updateRejected);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Rejected> {
    return this.rejectedService.remove(id);
  }
}
