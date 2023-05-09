import {Controller, Delete, Get, Param, Post, HttpCode, Patch, Body, HttpStatus} from '@nestjs/common';
import {CategoryService} from './category.service';
import {fillObject} from '@project/util/util-core';
import {CategoryRdo} from './rdo/category.rdo';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';
import {ApiResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('Actions with Categories')
@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category found.',
    type: CategoryRdo
  })
  @Get('/:id')
  async show(@Param('id') id: string) {
    const categoryId = parseInt(id, 10);
    const existCategory = await this.categoryService.getCategory(categoryId);
    return fillObject(CategoryRdo, existCategory);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All categories are loaded.',
    type: [CategoryRdo]
  })
  @Get('/')
  async index() {
    const categories = await this.categoryService.getCategories();
    return fillObject(CategoryRdo, categories);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new category has been successfully created.',
    type: CategoryRdo
  })
  @Post('/')
  async create(@Body() dto: CreateCategoryDto) {
    const newCategory = await this.categoryService.createCategory(dto);
    return fillObject(CategoryRdo, newCategory);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category has been successfully deleted.',
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    const categoryId = parseInt(id, 10);
    await this.categoryService.deleteCategory(categoryId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category has been successfully updated.',
    type: CategoryRdo
  })
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    const categoryId = parseInt(id, 10);
    const updatedCategory = await this.categoryService.updateCategory(categoryId, dto)
    return fillObject(CategoryRdo, updatedCategory);
  }
}
