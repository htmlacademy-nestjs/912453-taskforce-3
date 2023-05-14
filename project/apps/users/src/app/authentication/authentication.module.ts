import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import {UserModule} from '../user/user.module';
import {JwtModule} from '@nestjs/jwt';
import {getJwtOptions} from '@project/config/config-users';
import {ConfigService} from '@nestjs/config';
import {JwtAccessStrategy} from './strategies/jwt-access.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    })
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtAccessStrategy],
})
export class AuthenticationModule {}
