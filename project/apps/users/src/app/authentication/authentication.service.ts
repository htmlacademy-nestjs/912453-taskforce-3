import {ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {TokenPayloadInterface, UserInterface} from '@project/shared/app-types';
import dayjs from 'dayjs';
import {USER_EXCEPTIONS} from './authentication.constant';
import {UserEntity} from '../user/user.entity';
import {LoginUserDto} from './dto/login-user.dto';
import {dbConfig} from '@project/config/config-users';
import {ConfigType} from '@nestjs/config';
import {UserRepository} from '../user/user.repository';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,

    @Inject(dbConfig.KEY)
    private readonly databaseConfig: ConfigType<typeof dbConfig>,
    private readonly jwtService: JwtService,
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
    const payload: TokenPayloadInterface = {
      sub: user._id,
      email: user.email,
      role: user.role,
      name: user.name
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }
}
