import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './create-article.dto';
import { Article } from './article.schema';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  async findAll(): Promise<Article[]> {
    return this.articlesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Article> {
    return this.articlesService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: CreateArticleDto,
  ): Promise<Article> {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Article> {
    return this.articlesService.remove(id);
  }

  @Patch(':id')
  async updateScore(
    @Param('id') id: string,
    @Body('addScore') addScore: string,
  ) {
    try {
      const updatedArticle = await this.articlesService.updateScore(
        id,
        addScore,
      );
      return { message: 'Score updated successfully', article: updatedArticle };
    } catch (error) {
      return { error: error.message };
    }
  }
}
