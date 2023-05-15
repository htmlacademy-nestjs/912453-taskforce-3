import {ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {TokenPayloadInterface, UserInterface} from '@project/shared/app-types';
import dayjs from 'dayjs';
import {USER_EXCEPTIONS} from './authentication.constant';
import {UserEntity} from '../user/user.entity';
import {LoginUserDto} from './dto/login-user.dto';
import {dbConfig, jwtConfig} from '@project/config/config-users';
import {ConfigType} from '@nestjs/config';
import {UserRepository} from '../user/user.repository';
import {JwtService} from '@nestjs/jwt';
import {RefreshTokenService} from '../refresh-token/refresh-token.service';
import {createJWTPayload} from '../../../../../libs/shared/app-types/src/lib/jwt';
import * as crypto from 'crypto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,

    @Inject(dbConfig.KEY)
    private readonly databaseConfig: ConfigType<typeof dbConfig>,
    private readonly jwtService: JwtService,
    @Inject (jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService
  ) {}

  public async register(dto: CreateUserDto): Promise<UserInterface> {
    const {email, name, about, role, password, city, dateBirth, avatar} = dto;

    const user = {
      email, name, role, city, about,
      avatar: avatar || '',
      dateBirth: dayjs(dateBirth).toDate(),
      passwordHash: ''
    };

    const existUser = await this.userRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(USER_EXCEPTIONS.UserEmailExist);
    }

    const userEntity = await new UserEntity(user)
      .setPassword(password);

    return this.userRepository
      .create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(USER_EXCEPTIONS.UserNotFound);
    }

    const userEntity = new UserEntity(existUser);
    if (!await userEntity.comparePassword(password)) {
      throw new UnauthorizedException(USER_EXCEPTIONS.UserPasswordWrong);
    }

    return userEntity.toObject();
  }

  public async getUser(id: string) {
    return this.userRepository.findById(id);
  }

  public async createUserToken(user: UserInterface) {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload)

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      })
    }
  }
}
