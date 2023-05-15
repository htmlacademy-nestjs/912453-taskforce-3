import { Module } from '@nestjs/common';
import {ConfigNotifyModule} from '@project/config/config-notify';
import {MongooseModule} from '@nestjs/mongoose';
import {getMongooseOptions} from '@project/util/util-core';
import {EmailSubscriberModule} from './email-subscriber/email-subscriber.module';
import {MailModule} from './mail/mail.module';

@Module({
  imports: [
    ConfigNotifyModule,
    MongooseModule.forRootAsync(getMongooseOptions('application.db')),
    EmailSubscriberModule,
    MailModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
