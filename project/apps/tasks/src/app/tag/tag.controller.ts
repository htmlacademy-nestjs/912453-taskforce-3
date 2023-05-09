import {Controller, Get, HttpStatus} from '@nestjs/common';
import {TagService} from './tag.service';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {TagRdo} from './rdo/tag.rdo';
import {fillObject} from '@project/util/util-core';

@ApiTags('Actions with tags')
@Controller('tags')
export class TagController {
  constructor(
    private readonly tagService: TagService
  ){}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Список всех тегов',
    type: [TagRdo]
  })
  @Get('/')
  async getAllTags() {
    const tags = this.tagService.getTags();
    return fillObject(TagRdo, tags);
  }
}
