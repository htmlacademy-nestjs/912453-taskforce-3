import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import {UserModule} from '../user/user.module';
import {JwtModule} from '@nestjs/jwt';
import {getJwtOptions} from '@project/config/config-users';
import {ConfigService} from '@nestjs/config';
import {JwtAccessStrategy} from './strategies/jwt-access.strategy';
import {NotifyModule} from '../notify/notify.module';
import {LocalStrategy} from './strategies/local.strategy';
import {JwtRefreshStrategy} from './strategies/jwt-refresh.strategy';
import {RefreshTokenModule} from '../refresh-token/refresh-token.module';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    }),
    NotifyModule, RefreshTokenModule
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtAccessStrategy, LocalStrategy, JwtRefreshStrategy],
})
export class AuthenticationModule {}
