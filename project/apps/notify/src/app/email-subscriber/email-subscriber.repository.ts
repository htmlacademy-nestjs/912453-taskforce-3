import {CRUDRepositoryInterface} from '@project/util/util-types';
import {EmailSubscriberEntity} from './email-subscriber.entity';
import {SubscriberInterface} from '@project/shared/app-types';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {EmailSubscriberModel} from './email-subscriber.model';
import {Model} from 'mongoose';
import {UserRole} from '@project/shared/app-types';

@Injectable()
export class EmailSubscriberRepository implements CRUDRepositoryInterface<EmailSubscriberEntity, string, SubscriberInterface> {
  constructor(
    @InjectModel(EmailSubscriberModel.name) private readonly emailSubscriberModel: Model<EmailSubscriberModel>
  ) {}

  public async create(item: EmailSubscriberEntity): Promise<SubscriberInterface> {
    const newEmailSubscriber = new this.emailSubscriberModel(item);
    return newEmailSubscriber.save();
  }

  public async findById(id: string): Promise<SubscriberInterface | null> {
    return this.emailSubscriberModel.findOne({ _id: id }).exec();
  }

  public async destroy(id: string): Promise<void> {
    this.emailSubscriberModel.deleteOne({ _id: id });
  }

  public async update(id: string, item: EmailSubscriberEntity): Promise<SubscriberInterface> {
    return this.emailSubscriberModel.findByIdAndUpdate(id, item.toObject(), { new: true }).exec();
  }

  public async findByEmail(email: string): Promise<SubscriberInterface | null> {
    return this.emailSubscriberModel.findOne({ email }).exec()
  }

  public async findByRole(userRole: UserRole): Promise<SubscriberInterface[]> {
    return this.emailSubscriberModel.find({ role: userRole }).exec();
  }
}
