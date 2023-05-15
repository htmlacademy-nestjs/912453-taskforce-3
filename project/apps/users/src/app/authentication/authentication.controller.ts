import {Post, Body, Controller, Param, Get, UseGuards, Req, HttpStatus, HttpCode} from '@nestjs/common';
import {AuthenticationService} from './authentication.service';
import {fillObject} from '@project/util/util-core';
import {UserRdo} from './rdo/user.rdo';
import {CreateUserDto} from './dto/create-user.dto';
// import {LoginUserDto} from './dto/login-user.dto';
import {LoggedUserRdo} from './rdo/logged-user.rdo';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {MongoidValidationPipe} from '@project/shared/shared-pipes';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {NotifyService} from '../notify/notify.service';
import {LocalAuthGuard} from './guards/local-auth-guard';
import {RequestWithUser} from '@project/shared/app-types';
import {JwtRefreshGuard} from './guards/jwt-refresh.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    const { email, name } = newUser;
    await this.notifyService.registerSubscriber({ email, name })
    return fillObject(UserRdo, newUser);
  }

  @UseGuards(LocalAuthGuard)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }
  // public async login(@Body() dto: LoginUserDto) {
  //   const verifiedUser = await this.authService.verifyUser(dto);
  //   const loggedUser = await this.authService.createUserToken(verifiedUser);
  //   return fillObject(LoggedUserRdo, Object.assign(verifiedUser, loggedUser));
  // }

  @ApiResponse({
    type: UserRdo,
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);
    return fillObject(UserRdo, existUser);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }
}
