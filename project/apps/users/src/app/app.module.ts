import {Module} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {AuthenticationModule} from './authentication/authentication.module';
import {ConfigUsersModule, getMongooseOptions} from '@project/config/config-users';
import {MongooseModule} from '@nestjs/mongoose';
import {NotifyModule} from './notify/notify.module';
import {RefreshTokenModule} from './refresh-token/refresh-token.module';

@Module({
  imports: [
    UserModule, AuthenticationModule, ConfigUsersModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    NotifyModule, RefreshTokenModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
