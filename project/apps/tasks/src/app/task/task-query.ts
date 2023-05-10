import {City, SortType, TaskStatus} from '@project/shared/app-types';
import {Transform} from 'class-transformer';
import {IsIn, IsNumber, IsOptional} from 'class-validator';
import {DEFAULT_SORT_DIRECTION, DEFAULT_SORT_TYPE, DEFAULT_TASKS_LIMIT} from './task.constant';

export class TaskQuery {
  @Transform(({ value } ) => +value || DEFAULT_TASKS_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit?: number;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @IsOptional()
  public sortType?: SortType = DEFAULT_SORT_TYPE;

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
