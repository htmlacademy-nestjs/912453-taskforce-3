import { Injectable } from '@nestjs/common';
import {TaskMemoryRepository} from './task-memory.repository';
import {TaskInterface} from '@project/shared/app-types';
import {CreateTaskDto} from './dto/create-task.dto';
import dayjs from 'dayjs';
import {TaskEntity} from './task.entity';
import {TasksQuery} from './tasks-query';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskMemoryRepository
  ) {}

  public async create(dto: CreateTaskDto, userId): Promise<TaskInterface> {
    const {title, description, categoryId, price, dueDate, image, address, tagsId, city} = dto;

    const task = {
      title, description, categoryId, price, city,
      image: image || '',
      address: address || '',
      tagsId: tagsId || [],
      comments: [],
      dueDate: dayjs(dueDate).toDate(),
      userId
    };

    const taskEntity = await new TaskEntity(task);

    return this.taskRepository.create(taskEntity);
  }

  public async getTask(taskId: string): Promise<TaskInterface | null> {
    return this.taskRepository.findById(taskId);
  }

  public async getTasksList(query: TasksQuery): Promise<TaskInterface[]> {
    return this.taskRepository.find(query);
  }

  public async deleteTask(id: string): Promise<void> {
    this.taskRepository.destroy(id);
    // Todo - add comments repo and delete all relevant comments
  }

}
