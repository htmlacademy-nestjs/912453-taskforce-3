import {CRUDRepositoryInterface} from '@project/util/util-types';
import {UserEntity} from './user.entity';
import {UserInterface} from '@project/shared/app-types';
import * as crypto from 'crypto';
import {Injectable} from '@nestjs/common';

@Injectable()
export class UserMemoryRepository implements CRUDRepositoryInterface<UserEntity, string, UserInterface> {
  private repository: {[key: string]: UserInterface} = {};

  public async create(item: UserEntity): Promise<UserInterface> {
    const entry = {...item.toObject(), _id: crypto.randomUUID()};
    this.repository[entry._id] = entry;
    return entry;
  }

  public async findById(id: string): Promise<UserInterface | null> {
    return {...this.repository[id]} ?? null;
  }

  public async findByEmail(email: string): Promise<UserInterface | null> {
    const existUser = Object.values(this.repository)
      .find((userItem) => userItem.email === email);

    if (! existUser) {
      return null;
    }

    return { ...existUser};
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: UserEntity): Promise<UserInterface> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }
}
