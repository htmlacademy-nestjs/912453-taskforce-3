import {City, TaskStatus} from '@project/shared/app-types';

export interface TaskInterface {
  _id?: string;
  title: string;
  description: string;
  categoryId: number;
  price?: number;
  dueDate?: Date;
  image?: string;
  address?: string;
  tagsId?: string[];
  city: City;
  userId: string;
  createdAt?: Date;
  status?: TaskStatus;
  responses?: string[];
  responsesCount?: number;
  commentsCount?: number;
  contractorId?: string;
}
