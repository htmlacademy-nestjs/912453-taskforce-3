import {Body, Controller, HttpStatus, Param, Post, Get, Query, Patch, Delete} from '@nestjs/common';
import {TaskService} from './task.service';
import {CreateTaskDto} from './dto/create-task.dto';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {fillObject} from '@project/util/util-core';
import {TaskRdo} from './rdo/task.rdo';
import {TaskQuery} from './task-query';
import {UpdateTaskStatusDto} from './dto/update-task-status.dto';

@ApiTags('Actions with Tasks')
@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Новая задача успешно создана.',
    type: TaskRdo
  })
  @Post('new')
  public async create(@Body() dto: CreateTaskDto) {
    const newTask = await this.taskService.createTask(dto);
    console.log(newTask);
    return fillObject(TaskRdo, newTask);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Задача найдена.',
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
    description: 'Список задач в соответствии с запросом.',
    type: [TaskRdo]
  })
  @Get('/')
  async index(@Query() query: TaskQuery) {
    const tasks = await this.taskService.getTasksList(query);
    return fillObject(TaskRdo, tasks);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Задание успешно удалено.'
  })
  @Delete('/:id')
  async destroy(@Param('id') id: string) {
    const taskId = parseInt(id, 10);
    return this.taskService.deleteTask(taskId);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'Статус задачи обновлен.'
  })
  @Patch('/status/:id')
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateTaskStatusDto) {
    const taskId = parseInt(id, 10);
    const updatedTask = await this.taskService.updateTaskStatus(taskId, dto);
    return fillObject(TaskRdo, updatedTask);
  }
}
