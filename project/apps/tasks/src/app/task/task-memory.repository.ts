import {CRUDRepositoryInterface} from '@project/util/util-types';
import {TaskInterface} from '@project/shared/app-types';
import * as crypto from 'crypto';
import {Injectable} from '@nestjs/common';
import {TaskEntity} from './task.entity';
import {TasksQuery} from './tasks-query';

@Injectable()
export class TaskMemoryRepository implements CRUDRepositoryInterface<TaskEntity, string, TaskInterface> {
  private repository: {[key: string]: TaskInterface} = {};

  public async create(item: TaskEntity): Promise<TaskInterface> {
    const entry = {...item.toObject(), _id: crypto.randomUUID()};
    this.repository[entry._id] = entry;
    return entry;
  }

  public async findById(id: string): Promise<TaskInterface | null> {
    return {...this.repository[id]} ?? null;
  }

  public async find(query: TasksQuery): Promise<TaskInterface[]> {
    console.log(query); //Todo - обработка запроса, может быть средствами СУБД
    return Object.values(this.repository);
  }
  // Пока не знаю, нужны ли такие методы, фильтр может быть составной,
  // может потребуется для метода find
  // public async findByTags(tag: string): Promise<TaskInterface | null> {}
  // public async findByCategory(categoryId: string): Promise<TaskInterface | null> {}
  // public async findByCity(city: City): Promise<TaskInterface | null> {}

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: TaskEntity): Promise<TaskInterface> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }
}
