import {CRUDRepositoryInterface} from '@project/util/util-types';
import {TaskInterface, TaskStatus} from '@project/shared/app-types';
import {Injectable} from '@nestjs/common';
import {TaskEntity} from './task.entity';
import {PrismaService} from '../prisma/prisma.service';
import {TaskQuery} from './task-query';
import {TagService} from '../tag/tag.service';

@Injectable()
export class TaskRepository implements CRUDRepositoryInterface<TaskEntity, number, TaskInterface> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tagService: TagService
    ) {
  }

  public async create(item: TaskEntity): Promise<TaskInterface> {
    const entityData = item.toObject();
    console.log(item);
    const tagIds = entityData.tags.map((tag) => ({tagId: tag.tagId}));
    return this.prisma.task.create({
      data: {
        ...entityData,
        comments: {connect:[]},
        tags: {connect: tagIds},
        responses: {connect: []}
      },
        include: {
          category: true,
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

  public async find(query?: TaskQuery): Promise<TaskInterface[]> {
    const {limit, sortDirection, sortType, page, city, categoryId, status, tag, userId, contractorId} = query;
    const existingTag = await this.tagService.findByName(tag);
    return this.prisma.task.findMany({
      where: {
        status, city, userId, contractorId, categoryId,
        tags: {...(existingTag ? { some: { name: existingTag.name } } : {})}
      },
      include: {
        category: true,
        comments: true,
        tags: true,
        responses: true
      },
      orderBy: [{ [sortType]: sortDirection }],
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined
    });
  }

  public async update(taskId: number, item: TaskEntity) {
    return Promise.resolve(undefined);
  }

  public async setAcceptedResponse(taskId: number, contractorId: string, price?: number) {
    return this.prisma.task.update({
      where: {taskId},
      data: {contractorId, price},
      include: {
        category: true,
        comments: true,
        tags: true,
        responses: true
      }
    });
  }

  public async updateCommentsCounter(taskId: number, commentsCount: number) {
    this.prisma.task.update({
      where: {taskId},
      data: {commentsCount},
    });
  }
  public async updateResponsesCounter(taskId: number, responsesCount: number) {
    this.prisma.task.update({
      where: {taskId},
      data: {responsesCount},
    });
  }

  updateTaskStatus(taskId: number, status: TaskStatus) {
    return this.prisma.task.update({
      where: {taskId},
      data: {status},
      include: {
        category: true,
        comments: true,
        tags: true,
        responses: true
      }
    });
  }


}
