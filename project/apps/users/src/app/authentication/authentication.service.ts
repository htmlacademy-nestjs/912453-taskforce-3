import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {UserMemoryRepository} from '../user/user-memory.repository';
import {CreateUserDto} from './dto/create-user.dto';
import {UserInterface} from '@project/shared/app-types';
import dayjs from 'dayjs';
import {AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG} from './authentication.constant';
import {UserEntity} from '../user/user.entity';
import {LoginUserDto} from './dto/login-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserMemoryRepository
  ) {}

  public async register(dto: CreateUserDto): Promise<UserInterface> {
    const {email, name, role, password, city, dateBirth, avatar} = dto;

    const user = {
      email, name, role, city,
      avatar: avatar || '',
      dateBirth: dayjs(dateBirth).toDate(),
      passwordHash: ''
    };

    const existUser = await this.userRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
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
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const userEntity = new UserEntity(existUser);
    if (!await userEntity.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return userEntity.toObject();
  }

  public async getUser(id: string) {
    return this.userRepository.findById(id);
  }
}
