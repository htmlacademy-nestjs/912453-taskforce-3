import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SubscriberInterface } from '@project/shared/app-types';
import { EMAIL_ADD_SUBSCRIBER_SUBJECT, EMAIL_NEW_TASK_SUBJECT } from './mail.constant';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifyNewSubscriber(subscriber: SubscriberInterface) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.name}`,
        email: `${subscriber.email}`,
      }
    })
  }

  public async sendNotifyAllSubscribers(subscribers: SubscriberInterface[]) {
    for (const subscriber of subscribers) {
      await this.mailerService.sendMail({
        to: subscriber.email,
        subject: EMAIL_NEW_TASK_SUBJECT,
        template: './new-task',
        context: {
          user: `${subscriber.name}`,
        }
      })
    }
  }
}
