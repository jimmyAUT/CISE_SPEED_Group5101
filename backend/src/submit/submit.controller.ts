import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Submit } from './submit.schema';
import { SubmitService } from './submit.service';

@Controller('submit')
export class SubmitController {
  constructor(private readonly submitService: SubmitService) {}

  @Post()
  async create(@Body() newSubmit: any): Promise<Submit> {
    return this.submitService.create(newSubmit);
  }

  @Get()
  async findAll(): Promise<Submit[]> {
    return this.submitService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Submit> {
    return this.submitService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() newSubmit: any,
  ): Promise<Submit> {
    return this.submitService.update(id, newSubmit);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Submit> {
    return this.submitService.remove(id);
  }

  @Post()
  async searchSubmit(@Body() status: string) {
    return this.submitService.searchSubmit(status);
  }
}
