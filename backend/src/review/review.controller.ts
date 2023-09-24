import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { SearchService } from 'src/search/search.service';
import { SearchDto } from 'src/search/search.dto';
import { Rejected } from 'src/rejected/rejected.schema';
import { CreateRejectedDto } from 'src/rejected/create-rejected.dto';
import { RejectedService } from 'src/rejected/rejected.service';
import { SearchRejected } from 'src/rejected/searchRejected.dto';

@Controller('review')
export class ReviewController {
  // use the /search service to search the SPEED DB
  // use the /rejected service to search the Rejected DB
  constructor(
    private readonly rejectedService: RejectedService,
    private readonly searchService: SearchService,
  ) {}

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
  async SearchRejected(@Body() searchDto: SearchRejected) {
    return this.rejectedService.findByDoi(searchDto);
  }

  @Get('rejected/:id')
  async findById(@Param('id') id: string): Promise<Rejected> {
    return this.rejectedService.findById(id);
  }

  @Put('rejected/:id')
  async update(
    @Param('id') id: string,
    @Body() updateRejected: CreateRejectedDto,
  ): Promise<Rejected> {
    return this.rejectedService.update(id, updateRejected);
  }

  @Delete('rejected/:id')
  async remove(@Param('id') id: string): Promise<Rejected> {
    return this.rejectedService.remove(id);
  }

  @Post('articles')
  async searchArticles(@Body() searchDto: SearchDto) {
    return this.searchService.searchArticles(searchDto);
  }
  @Get('articles-all')
  async searchAll() {
    return this.searchService.searchAll();
  }
}
