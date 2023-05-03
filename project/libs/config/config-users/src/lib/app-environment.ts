import {IsEnum, IsNumber, IsString, Max, Min} from 'class-validator';
import {ApplicationConfig} from './config/app.config';

const MIN_PORT = 0;
const MAX_PORT = 65535;

export enum EnvType {
  Development = 'development',
  Production = 'production',
  Stage = 'stage'
}

export enum EnvValidationMessage {
  AppPortRequired = 'MongoDB port is required',
  EnvRequired = 'Environment is required',
}

export class AppEnvironment {
  @IsNumber({}, {
    message: EnvValidationMessage.AppPortRequired
  })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public port: number;

  // @IsString({
  //   message: EnvValidationMessage.EnvRequired
  // })
  @IsEnum(EnvType)
  public environment: EnvType;
}
