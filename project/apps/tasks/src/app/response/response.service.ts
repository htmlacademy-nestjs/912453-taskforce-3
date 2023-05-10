import {BadRequestException, Injectable} from '@nestjs/common';
import {ResponseRepository} from './response.repository';
import {CreateResponseDto} from './dto/create-response.dto';
import {ResponseInterface, TaskInterface} from '@project/shared/app-types';
import {ResponseEntity} from './response.entity';
import {TaskService} from '../task/task.service';
import {EXCEPTION} from '../task/task.constant';

@Injectable()
export class ResponseService {
  constructor(
    private readonly responseRepository: ResponseRepository,
    private readonly taskService: TaskService
  ) {}

  async createResponse(dto: CreateResponseDto): Promise<ResponseInterface> {
    const responseEntity = new ResponseEntity({...dto});

    const response = this.responseRepository.create(responseEntity);
    await this.taskService.incrementResponsesCounter(dto.taskId, +1);
    return response;
  }

  async getResponsesByTaskId(taskId: number): Promise<ResponseInterface[]>{
    return this.responseRepository.findByTaskId(taskId);
  }

  async getResponsesByUserId(userId: string): Promise<ResponseInterface[]>{
    return this.responseRepository.findByUserId(userId);
  }

  async acceptResponse(responseId: number): Promise<TaskInterface | null> {
    const response = await this.responseRepository.findById(responseId);
    const allTaskResponses = await this.getResponsesByTaskId(response.taskId)
    if(allTaskResponses.includes(response) ) {
       return await this.taskService.setAcceptedResponse(response);
    } else {
      throw new BadRequestException(EXCEPTION.ContractorNotResponse);
    }
  }
}
