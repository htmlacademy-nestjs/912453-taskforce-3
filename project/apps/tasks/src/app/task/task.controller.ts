import {Body, Controller, HttpStatus, Param, Post, Get, Query} from '@nestjs/common';
import {TaskService} from './task.service';
import {CreateTaskDto} from './dto/create-task.dto';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {fillObject} from '@project/util/util-core';
import {TaskRdo} from './rdo/task.rdo';
import {TasksQuery} from './tasks-query';

@ApiTags('Actions with Tasks')
@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new task has been successfully created.',
    type: TaskRdo
  })
  @Post('new')
  public async create(@Body() dto: CreateTaskDto) {
    const userId = '123421341234' // Пока тут заглушка, пданные ользователя будем вытаскивать из токена
    const newTask = await this.taskService.createTask(dto, userId);
    console.log(newTask);
    return fillObject(TaskRdo, newTask);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task found.',
    type: TaskRdo
  })
  @Get('/:id')
  async show(@Param('id') id: string) {
    const taskId = parseInt(id, 10);
    const existTask = await this.taskService.getTask(taskId);
    return fillObject(TaskRdo, existTask);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task list according to query.',
    type: [TaskRdo]
  })
  @Get('/')
  async index(@Query() query: TasksQuery) {
    const tasks = await this.taskService.getTasksList(query);
    return fillObject(TaskRdo, tasks);
  }

}
