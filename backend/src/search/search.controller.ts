import { Controller, Get, Body, Post } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchDto } from 'src/search/search.dto';
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
  @Post()
  async searchArticles(@Body() searchDto: SearchDto) {
    return this.searchService.searchArticles(searchDto);
  }
  @Get('all')
  async searchAll() {
    return this.searchService.search();
  }
}
