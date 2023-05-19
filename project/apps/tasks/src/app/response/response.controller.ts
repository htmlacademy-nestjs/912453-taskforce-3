import {Body, Controller, Get, HttpStatus, Param, Post} from '@nestjs/common';
import {ResponseService} from './response.service';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {ResponseRdo} from './rdo/response.rdo';
import {fillObject} from '@project/util/util-core';
import {CreateResponseDto} from './dto/create-response.dto';

@ApiTags('Actions with task responses')
@Controller('response')
export class ResponseController {
  constructor(
    private readonly responseService: ResponseService
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Отклики к заданию найдены',
    type: [ResponseRdo]
  })
  @Get('/:taskId')
  public async getTaskResponses(@Param('taskId') id: string) {
    const taskId = parseInt(id, 10);
    const existResponses = await this.responseService.getResponsesByTaskId(taskId);
    return fillObject(ResponseRdo, existResponses)
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Отклики пользователя получены',
    type: [ResponseRdo]
  })
  @Get('/:userId')
  async getUserResponses(@Param('userId') userId: string) {
    const existResponses = this.responseService.getResponsesByUserId(userId);
    return fillObject(ResponseRdo, existResponses);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Отклик на задание создан',
    type: ResponseRdo
  })
  @Post('/')
  async create(@Body() dto: CreateResponseDto) {
    const newResponse = this.responseService.createResponse(dto);
    return fillObject(ResponseRdo, newResponse);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Выбран исполнитель, оставивший отклик.',
    type: ResponseRdo
  })
  @Post('/accept/:id')
  async acceptResponse(@Param('id') id: string) {
    const responseId = parseInt(id, 10);
    const acceptedResponse = await this.responseService.acceptResponse(responseId);
    return fillObject(ResponseRdo, acceptedResponse);
  }
}
