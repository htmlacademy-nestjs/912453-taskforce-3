import {
  CategoryInterface,
  CommentInterface,
  TagInterface,
  ResponseInterface,
} from '@project/shared/app-types';
import {City, TaskStatus} from '@prisma/client';

export interface TaskInterface {
  id?: number;
  title: string;
  description: string;
  category?: CategoryInterface;
  price?: number;
  dueDate?: Date;
  image?: string;
  address?: string;
  tags?: TagInterface[];
  comments?: CommentInterface[];
  city: City;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: TaskStatus;
  responses?: ResponseInterface[];
  responsesCount?: number;
  commentsCount?: number;
  contractorId?: string;
}
