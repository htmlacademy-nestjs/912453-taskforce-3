import {Injectable} from '@nestjs/common';
import {CRUDRepositoryInterface} from '@project/util/util-types';
import {UserEntity} from './user.entity';
import {UserInterface} from '@project/shared/app-types';
import {InjectModel} from '@nestjs/mongoose';
import {UserModel} from './user.model';
import {Model} from 'mongoose';


@Injectable()
export class UserRepository implements CRUDRepositoryInterface<UserEntity, string, UserInterface>{
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>
  ) {}

  public async create(item: UserEntity): Promise<UserInterface> {
    const newUser = new this.userModel(item);
    return newUser.save();
  }

  public async findById(id: string): Promise<UserInterface | null> {
    return this.userModel
      .findOne({_id: id})
      .exec();
  }

  public async findByEmail(email: string): Promise<UserInterface | null> {
    return this.userModel
      .findOne({email})
      .exec();
  }

  public async destroy(id: string): Promise<void> {
    this.userModel.deleteOne({_id: id}).exec();
  }

  public async update(id: string, item: UserEntity): Promise<UserInterface> {
    return this.userModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }
}
