import {BadRequestException, ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {ResponseInterface, TaskInterface, TaskStatus} from '@project/shared/app-types';
import {CreateTaskDto} from './dto/create-task.dto';
import {TaskEntity} from './task.entity';
import {TaskQuery} from './task-query';
import {TaskRepository} from './task.repository';
import {CategoryService} from '../category/category.service';
import {TagService} from '../tag/tag.service';
import {UpdateTaskStatusDto} from './dto/update-task-status.dto';
import {DEFAULT_SORT_DIRECTION, DEFAULT_SORT_TYPE, DEFAULT_TASKS_LIMIT, EXCEPTION} from './task.constant';

const TAGS_MAX_COUNT = 5;

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService
  ) {}

  async createTask(dto: CreateTaskDto): Promise<TaskInterface> {
    const category = await this.categoryService.findOrCreate(dto.category);
    const tagsArray = Array.from(new Set(dto.tags)).slice(0, TAGS_MAX_COUNT);
    const tags = await this.tagService.findOrCreateMany(tagsArray);
    const taskEntity = new TaskEntity({
      ...dto,
      categoryId: category.categoryId,
      tags,
      comments: [],
      responses: [],
      status: TaskStatus.New,
    });

    return this.taskRepository.create(taskEntity);
  }

  async getTask(taskId: number): Promise<TaskInterface | null> {
    return this.taskRepository.findById(taskId);
  }

  async getTasksList(query: TaskQuery): Promise<TaskInterface[]> {
    query.sortType = query.sortType ?? DEFAULT_SORT_TYPE;
    query.sortDirection = query.sortDirection ?? DEFAULT_SORT_DIRECTION;
    query.limit = query.limit ?? DEFAULT_TASKS_LIMIT;
    return this.taskRepository.find(query);
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.destroy(id);
  }

  async updateTaskStatus(taskId: number, dto: UpdateTaskStatusDto) {
    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw new NotFoundException(EXCEPTION.TaskNotFound);
    }
    if (dto.userId !== task.userId) {
      throw new ForbiddenException(EXCEPTION.TaskForbidden);
    }

    switch (task.status) {
      case TaskStatus.New:
        if (dto.status === TaskStatus.Canceled || (dto.status === TaskStatus.InProgress && task.contractorId)) {
          return this.taskRepository.updateTaskStatus(taskId, dto.status);
        }
        break;
      case TaskStatus.InProgress:
        if (dto.status === TaskStatus.Failed || dto.status === TaskStatus.Completed) {
          return this.taskRepository.updateTaskStatus(taskId, dto.status);
        }
        break;
    }
    throw new BadRequestException(EXCEPTION.TaskStatusConditionsWrong);
  }

  async setAcceptedResponse(acceptedResponse: ResponseInterface): Promise<TaskInterface | null> {
    const tasksInProgress = await this.getTasksList({
      status: TaskStatus.InProgress,
      contractorId: acceptedResponse.contractorId
    });
    tasksInProgress.forEach((task) => {
      if(task.contractorId === acceptedResponse.contractorId) {
        throw new BadRequestException(EXCEPTION.TaskResponseExist)
      }
      if(task.contractorId) {
        throw new BadRequestException(EXCEPTION.TaskContractorAlreadyChosen)
      }
    });

    const task = await this.getTask(acceptedResponse.taskId);
    const price = acceptedResponse.offerPrice ?? task.price;

    return this.taskRepository.setAcceptedResponse(task.id, acceptedResponse.contractorId, price);
  }

  async incrementCommentsCounter(taskId: number, increment: number): Promise<void> {
    const task = await this.taskRepository.findById(taskId);
    let count = task.commentsCount + increment;
    count = count < 0 ? 0 : count;
    return this.taskRepository.updateCommentsCounter(taskId, count);
  }
  async incrementResponsesCounter(taskId: number, increment: number): Promise<void> {
    const task = await this.taskRepository.findById(taskId);
    let count = task.responsesCount + increment;
    count = count < 0 ? 0 : count;
    return this.taskRepository.updateResponsesCounter(taskId, count);
  }
}
