import {EntityInterface} from '@project/util/util-types';
import {SubscriberInterface, UserRole} from '@project/shared/app-types';

export class EmailSubscriberEntity implements EntityInterface<EmailSubscriberEntity>, SubscriberInterface {
  public id: string;
  public email: string;
  public name: string;
  public role: UserRole;

  constructor(subscriber: SubscriberInterface) {
    this.fillEntity(subscriber);
  }

  public fillEntity(entity) {
    this.id = entity.id ?? '';
    this.email = entity.email;
    this.name = entity.fullName;
    this.role = entity.role;
  }

  public toObject(): EmailSubscriberEntity {
    return { ...this };
  }
}
