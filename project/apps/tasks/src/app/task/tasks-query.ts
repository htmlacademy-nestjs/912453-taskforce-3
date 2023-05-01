import {City, TaskStatus} from '@project/shared/app-types';

export class TasksQuery {
  public limit?: number;
  public status?: TaskStatus;
  public page?: number;
  public categoryId?: number;
  public city?: City;
  public tag?: string;
  public sortType?: string;
}
