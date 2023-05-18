import {IsEnum, IsNumber, Max, Min} from 'class-validator';

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

  @IsEnum(EnvType)
  public environment: EnvType;
}
