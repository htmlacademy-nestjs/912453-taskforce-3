import {CRUDRepositoryInterface} from '@project/util/util-types';
import {TaskInterface} from '@project/shared/app-types';
import {Injectable} from '@nestjs/common';
import {TaskEntity} from './task.entity';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class TaskRepository implements CRUDRepositoryInterface<TaskEntity, number, TaskInterface> {
  constructor(private readonly prisma: PrismaService) {
  }

  public async create(item: TaskEntity): Promise<TaskInterface> {
    const entityData = item.toObject();
    const tagIds = entityData.tags.map((tag) => ({tagId: tag.tagId}));
    return this.prisma.task.create({
      data: {
        title: entityData.title,
        description: entityData.description,
        price: entityData.price,
        dueDate: entityData.dueDate,
        image: entityData.image,
        address: entityData.address,
        city: entityData.city,
        userId: entityData.userId,
        contractorId: entityData.contractorId,
        status: entityData.status,
        responsesCount: entityData.responsesCount,
        commentsCount: entityData.commentsCount,
        comments: {
          connect: []
        },
        category: {
          connect: {categoryId: entityData.category.categoryId}
        },
        tags: {
          connect: tagIds
        },
        responses: {
          connect: []
        }
      },
      include: {
        tags: true,
        comments: true,
        responses: true
      }
    });
  }


  public async destroy(taskId: number): Promise<void> {
    await this.prisma.task.delete({
      where: {taskId},
      include: {
        category: true,
        comments: true,
        tags: true,
        responses: true
      }
    });
  }

  public async findById(taskId: number): Promise<TaskInterface | null> {
    return this.prisma.task.findFirst({
      where: {taskId},
      include: {
        category: true,
        comments: true,
        tags: true,
        responses: true
      }
    });
  }

  public find(): Promise<TaskInterface[]> {
    return this.prisma.task.findMany({
      include: {
        category: true,
        comments: true,
        tags: true,
        responses: true
      }
    });
  }

  public update(id: number, item: TaskEntity): Promise<TaskInterface> {
    return Promise.resolve(undefined);
  }
}
