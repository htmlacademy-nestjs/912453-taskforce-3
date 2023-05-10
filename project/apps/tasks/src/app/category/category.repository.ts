import {Injectable} from '@nestjs/common';
import {CRUDRepositoryInterface} from '@project/util/util-types';
import {CategoryEntity} from './category.entity';
import {CategoryInterface} from '@project/shared/app-types';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class CategoryRepository implements CRUDRepositoryInterface<CategoryEntity, number, CategoryInterface>{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: CategoryEntity): Promise<CategoryInterface> {
    return this.prisma.category.create({
      data: { ...item.toObject() }
    });
  }

  public async destroy(categoryId: number): Promise<void> {
    await this.prisma.category.delete({
      where: {categoryId}
    });
  }

  public findById(categoryId: number): Promise<CategoryInterface | null> {
    return this.prisma.category.findFirst({
      where: {categoryId}
    });
  }

  public findByName(title: string): Promise<CategoryInterface | null> {
    return this.prisma.category.findFirst({
      where: {title}
    });
  }

  public find(): Promise<CategoryInterface[]> {
    return this.prisma.category.findMany();
  }

  public update(categoryId: number, item: CategoryEntity): Promise<CategoryInterface> {
    return this.prisma.category.update({
      where: {categoryId},
      data: {...item.toObject()}
    });
  }
}
