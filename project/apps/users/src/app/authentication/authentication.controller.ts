import {Post, Body, Controller, Param, Get, UseGuards, Req, Patch, HttpStatus, HttpCode} from '@nestjs/common';
import {AuthenticationService} from './authentication.service';
import {fillObject} from '@project/util/util-core';
import {UserRdo} from './rdo/user.rdo';
import {CreateUserDto} from './dto/create-user.dto';
import {LoggedUserRdo} from './rdo/logged-user.rdo';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {MongoidValidationPipe} from '@project/shared/shared-pipes';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {NotifyService} from '../notify/notify.service';
import {LocalAuthGuard} from './guards/local-auth-guard';
import {RequestWithUser, UserRole} from '@project/shared/app-types';
import {JwtRefreshGuard} from './guards/jwt-refresh.guard';
import {CustomerUserRdo} from './rdo/customer-user.rdo';
import {ContractorUserRdo} from './rdo/contractor-user.rdo';
import {ChangeUserPasswordDto} from './dto/change-user-password.dto';
import {UpdateUserDto} from './dto/update-user.dto';

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
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already exists.'
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    const { email, name, role } = newUser;
    await this.notifyService.registerSubscriber({ email, name })

    if (role === UserRole.Customer) {
      return fillObject(CustomerUserRdo, newUser);
    } else if (role === UserRole.Contractor) {
      return fillObject(ContractorUserRdo, newUser);
    }
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

  @ApiResponse({
    type: UserRdo,
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);
    if (existUser.role === UserRole.Customer) {
      return fillObject(CustomerUserRdo, existUser);
    } else if (existUser.role === UserRole.Contractor) {
      return fillObject(ContractorUserRdo, existUser);
    }
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

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully updated.'
  })
  @Patch(':id')
  async update(@Param('id', MongoidValidationPipe) id: string, @Body() dto: UpdateUserDto) {
    const updatedUser = await this.authService.update(id, dto);
    if (updatedUser.role === UserRole.Customer) {
      return fillObject(CustomerUserRdo, updatedUser);
    } else if (updatedUser.role === UserRole.Contractor) {
      return fillObject(ContractorUserRdo, updatedUser);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password has been successfully updated.'
  })
  @HttpCode(HttpStatus.OK)
  @Patch('password/:id')
  async updatePassword(@Param('id', MongoidValidationPipe) id: string, @Body() dto: ChangeUserPasswordDto) {
    return await this.authService.updatePassword(id, dto);
  }
}
