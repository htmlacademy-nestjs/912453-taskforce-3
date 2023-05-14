import {City, SortType, TaskStatus} from '@project/shared/app-types';
import {Transform} from 'class-transformer';
import {IsIn, IsNumber, IsOptional} from 'class-validator';
import {TASK_DEFAULT} from './task.constant';

export class TaskQuery {
  @Transform(({ value } ) => +value || TASK_DEFAULT.TASKS_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit?: number;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = TASK_DEFAULT.SORT_DIRECTION;

  @IsOptional()
  public sortType?: SortType = TASK_DEFAULT.SORT_TYPE;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;

  @IsOptional()
  public categoryId?: number;

  @IsOptional()
  public city?: City;

  @IsOptional()
  public status?: TaskStatus;

  @IsOptional()
  public tag?: string;

  @IsOptional()
  public userId?: string;

  @IsOptional()
  public contractorId?: string;
}
