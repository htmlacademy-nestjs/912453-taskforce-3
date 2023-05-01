import {City, TaskInterface, TaskStatus} from '@project/shared/app-types';
import dayjs from 'dayjs';

export class TaskEntity implements TaskInterface {
  public _id?: string;
  public title: string;
  public description: string;
  public categoryId: number;
  public price?: number;
  public dueDate?: Date;
  public image?: string;
  public address?: string;
  public tagsId?: string[];
  public city: City;
  public userId: string;
  public createdAt: Date = dayjs().toDate();
  public status: TaskStatus = TaskStatus.New;
  public responses: string[] = [];
  public responsesCount: number;
  public commentsCount: number;
  public contractorId: string;

  constructor(task: TaskInterface) {
    this.fillEntity(task);
    this.createdAt = dayjs().toDate();
  this.responsesCount = 0;
  this.commentsCount = 0;
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(task: TaskInterface) {
  this._id = task._id;
  this.title = task.title;
  this.description = task.description;
  this.categoryId = task.categoryId;
  this.price = task.price;
  this.dueDate = task.dueDate;
  this.image = task.image;
  this.address = task.address;
  this.tagsId = task.tagsId;
  this.city = task.city;
  this.userId = task.userId;
  }
}
