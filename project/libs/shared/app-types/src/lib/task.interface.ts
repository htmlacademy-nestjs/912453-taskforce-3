import {
  CommentInterface,
  TagInterface,
  ResponseInterface,
} from '@project/shared/app-types';
import {City, TaskStatus} from '@prisma/client';

export interface TaskInterface {
  id?: number;
  title: string;
  description: string;
  categoryId: number;
  price?: number;
  dueDate?: Date;
  image?: string;
  address?: string;
  tags?: TagInterface[];
  comments?: CommentInterface[];
  responses?: ResponseInterface[];
  city: City;
  userId: string;
  contractorId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: TaskStatus;
  responsesCount?: number;
  commentsCount?: number;
}
