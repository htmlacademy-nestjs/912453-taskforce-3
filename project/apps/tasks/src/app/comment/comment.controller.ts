import {Body, Controller, Get, HttpStatus, Param, Post, Delete} from '@nestjs/common';
import {CommentService} from './comment.service';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {fillObject} from '@project/util/util-core';
import {CreateCommentDto} from './dto/create-comment.dto';
import {CommentRdo} from './rdo/comment.rdo';
import {TaskRdo} from '../task/rdo/task.rdo';

@ApiTags('Actions with task comments')
@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new comment has been successfully created.'
  })
  @Post('new')
  public async create(@Body() dto: CreateCommentDto) {
      const userId = '123421341234' // Пока тут заглушка, пданные ользователя будем вытаскивать из токена
      const newComment = await this.commentService.create(dto, userId);
      return fillObject(CommentRdo, newComment);
    }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task list according to query.',
    type: [TaskRdo]
  })
  @Get('/')
  public async getTaskComments(@Param('id') id: string) {
    const comments = await this.commentService.getCommentsByTaskId(id);
    return fillObject(CommentRdo, comments);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete single comment by its Id.',
    type: [TaskRdo]
  })
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.commentService.deleteComment(id);
  }
}
