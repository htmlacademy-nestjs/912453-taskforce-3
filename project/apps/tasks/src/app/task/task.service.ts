import { Injectable } from '@nestjs/common';
import {TagInterface, TaskInterface} from '@project/shared/app-types';
import {CreateTaskDto} from './dto/create-task.dto';
import {TaskEntity} from './task.entity';
import {TasksQuery} from './tasks-query';
import {TaskRepository} from './task.repository';
import {CategoryService} from '../category/category.service';
import {TaskStatus} from '@prisma/client';
import {TagService} from '../tag/tag.service';

const TAGS_MAX_COUNT = 5;

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService
  ) {}

  async createTask(dto: CreateTaskDto, userId: string): Promise<TaskInterface> {
    const category = await this.categoryService.findOrCreate(dto.categoryName);
    const tagsArray = Array.from(new Set(dto.tags)).slice(0, TAGS_MAX_COUNT);
    const tags = await this.tagService.findOrCreateMany(tagsArray);
    const taskEntity = new TaskEntity({
      ...dto,
      category,
      tags,
      comments: [],
      responses: [],
      status: TaskStatus.New,
      userId,
    });

    return this.taskRepository.create(taskEntity);
  }

  async getTask(taskId: number): Promise<TaskInterface | null> {
    return this.taskRepository.findById(taskId);
  }

  async getTasksList(query: TasksQuery): Promise<TaskInterface[]> {
    console.log(query) // todo - add filters by query
    return this.taskRepository.find();
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.destroy(id);
  }

  async updateTask(taskId: number, dto: CreateTaskDto, userId: string): Promise<TaskInterface> {
    const existTask = await this.taskRepository.findById(taskId);
    const tagsArray = Array.from(new Set(dto.tags)).slice(0, TAGS_MAX_COUNT);
    const tags = await this.tagService.findOrCreateMany(tagsArray);
    const taskEntity = await new TaskEntity({
      ...existTask,
      ...dto,
      tags,
      userId,
    });
    return this.taskRepository.update(taskId, taskEntity);
  }
}
