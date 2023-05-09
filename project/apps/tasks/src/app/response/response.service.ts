import {Injectable} from '@nestjs/common';
import {ResponseRepository} from './response.repository';
import {CreateResponseDto} from './dto/create-response.dto';
import {ResponseInterface, TaskInterface} from '@project/shared/app-types';
import {ResponseEntity} from './response.entity';
import {TaskService} from '../task/task.service';
import {TaskStatus} from '@prisma/client';
import {TaskRepository} from '../task/task.repository';
import {TaskEntity} from '../task/task.entity';

@Injectable()
export class ResponseService {
  constructor(
    private readonly responseRepository: ResponseRepository,
    private readonly taskService: TaskService,
    private readonly taskRepository: TaskRepository
  ) {}

  async createResponse(dto: CreateResponseDto, userId: string): Promise<ResponseInterface> {
    const responseEntity = new ResponseEntity({
      ...dto,
      contractorId: userId
    });

    return this.responseRepository.create(responseEntity);
  }

  async getResponsesByTaskId(taskId: number): Promise<ResponseInterface[]>{
    return this.responseRepository.findByTaskId(taskId);
  }

  async getResponsesByUserId(userId: string): Promise<ResponseInterface[]>{
    return this.responseRepository.findByUserId(userId);
  }

  async acceptResponse(responseId: number): Promise<ResponseInterface | null> {
    const response = await this.responseRepository.findById(responseId);
    const task = await this.taskRepository.findById(response.taskId);
    if(task.status === TaskStatus.New) {
      const updatedTask = new TaskEntity({
        ...task,
        id: response.taskId,
        status: TaskStatus.InProgress,
        contractorId: response.contractorId,
        price: response.offerPrice ?? task.price
        // todo - add User's employment check
      });
      await this.taskRepository.update(task.id, updatedTask);
      return response;
    }
    return null;
  }
}
