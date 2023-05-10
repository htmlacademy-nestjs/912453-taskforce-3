import {CRUDRepositoryInterface} from '@project/util/util-types';
import {TaskInterface} from '@project/shared/app-types';
import * as crypto from 'crypto';
import {Injectable} from '@nestjs/common';
import {TaskEntity} from './task.entity';
import {TaskQuery} from './task-query';

@Injectable()
export class TaskMemoryRepository implements CRUDRepositoryInterface<TaskEntity, number, TaskInterface> {
  private repository: {[key: string]: TaskInterface} = {};

  public async create(item: TaskEntity): Promise<TaskInterface> {
    const entry = {...item.toObject(), _id: crypto.randomUUID()};
    this.repository[entry._id] = entry;
    return entry;
  }

  public async findById(id: number): Promise<TaskInterface | null> {
    return {...this.repository[id]} ?? null;
  }

  public async find(query: TaskQuery): Promise<TaskInterface[]> {
    console.log(query); //Todo - обработка запроса, может быть средствами СУБД
    return Object.values(this.repository);
  }

  public async destroy(id: number): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: number, item: TaskEntity): Promise<TaskInterface> {
    this.repository[id] = {...item.toObject(), id: id};
    return this.findById(id);
  }
}
