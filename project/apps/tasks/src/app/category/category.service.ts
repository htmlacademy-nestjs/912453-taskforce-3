import { Injectable } from '@nestjs/common';
import {CategoryRepository} from './category.repository';
import {CategoryInterface} from '@project/shared/app-types';
import {CategoryEntity} from './category.entity';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository
  ) {}

  async createCategory(dto: CreateCategoryDto): Promise<CategoryInterface> {
    const categoryEntity = new CategoryEntity(dto);
    return this.categoryRepository.create(categoryEntity);
  }

  async deleteCategory(id: number): Promise<void> {
    this.categoryRepository.destroy(id);
  }

  async getCategory(id: number): Promise<CategoryInterface> {
    return this.categoryRepository.findById(id);
  }

  async findOrCreate(title: string): Promise<CategoryInterface> {
    const existCategory = await this.categoryRepository.findByName(title);

    if(!existCategory) {
      return this.createCategory({title});
    }

    return existCategory;
  }

  async getCategories(): Promise<CategoryInterface[]> {
    return this.categoryRepository.find();
  }

  async updateCategory(id: number, dto: UpdateCategoryDto): Promise<CategoryInterface> {
    return this.categoryRepository.update(id, new CategoryEntity(dto));
  }
}
