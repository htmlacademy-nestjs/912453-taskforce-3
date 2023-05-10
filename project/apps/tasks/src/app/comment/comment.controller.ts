import {Body, Controller, Get, HttpStatus, Param, Post, Delete} from '@nestjs/common';
import {CommentService} from './comment.service';
import {ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';
import {fillObject} from '@project/util/util-core';
import {CreateCommentDto} from './dto/create-comment.dto';
import {CommentRdo} from './rdo/comment.rdo';

@ApiTags('Actions with task comments')
@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new comment has been successfully created.',
    type: CommentRdo
  })
  @Post('new')
  public async create(@Body() dto: CreateCommentDto) {
      console.log('comment dto in controller: ', dto);
      const newComment = await this.commentService.create(dto);
      return fillObject(CommentRdo, newComment);
    }

  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Список комментариев к указанной задаче.',
    type: [CommentRdo]
  })
  @Get('/:id')
  public async getTaskComments(@Param('id') id: string) {
    const taskId = parseInt(id, 10);
    console.log('taskId in controller is:', taskId);
    const comments = await this.commentService.getCommentsByTaskId(taskId);
    return fillObject(CommentRdo, comments);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Комментарий удален.',
    type: [CommentRdo]
  })
  @Delete('/:id')
  public async delete(@Param('id') id: string) {
    const commentId = parseInt(id, 10);
    return await this.commentService.deleteComment(commentId);
  }
}
