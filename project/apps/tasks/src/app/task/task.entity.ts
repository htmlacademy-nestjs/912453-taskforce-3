import {
  CategoryInterface,
  CommentInterface, TagInterface,
  TaskInterface,
  ResponseInterface,
} from '@project/shared/app-types';
import {EntityInterface} from '@project/util/util-types';
import {City, TaskStatus} from '@prisma/client';

export class TaskEntity implements EntityInterface<TaskEntity>, TaskInterface {
  public id: number;
  public title: string;
  public description: string;
  public category: CategoryInterface;
  public price: number;
  public dueDate?: Date;
  public image?: string;
  public address?: string;
  public tags: TagInterface[];
  public comments: CommentInterface[];
  public responses: ResponseInterface[];
  public city: City;
  public userId: string;
  public contractorId?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public status: TaskStatus;
  public responsesCount?: number;
  public commentsCount?: number;

  constructor(task: TaskInterface) {
    this.fillEntity(task);
  }

  public toObject() {
    return {
      ...this,
      tags: [...this.tags],
      responses: [...this.responses],
      comments: [...this.comments]
    }
  }

  public fillEntity(task: TaskInterface) {
  this.id = task.id;
  this.title = task.title;
  this.description = task.description;
  this.category = task.category;
  this.price = task.price;
  this.dueDate = task.dueDate;
  this.image = task.image;
  this.address = task.address;
  this.tags = task.tags;
  this.comments = task.comments;
  this.responses = task.responses;
  this.city = task.city;
  this.userId = task.userId;
  this.contractorId = task.contractorId;
  this.createdAt = task.createdAt;
  this.updatedAt = task.updatedAt;
  this.status = task.status;
  this.responsesCount = task.responsesCount;
  this.commentsCount = task.commentsCount;
  }
}
