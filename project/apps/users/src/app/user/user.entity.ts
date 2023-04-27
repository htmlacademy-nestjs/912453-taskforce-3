import {City, UserInterface, UserRole} from '@project/shared/app-types';
import {compare, genSalt, hash} from 'bcrypt';
import {SALT_ROUNDS} from './user.constant';

export class UserEntity implements UserInterface {
  public _id: string;
  public avatar: string;
  public dateBirth: Date;
  public email: string;
  public name: string;
  public city: City;
  public passwordHash: string;
  public role: UserRole;

  constructor(user: UserInterface) {
    this.fillEntity(user);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(user: UserInterface) {
    this._id = user._id;
    this.avatar = user.avatar;
    this.dateBirth = user.dateBirth;
    this.email = user.email;
    this.name = user.name;
    this.city = user.city;
    this.passwordHash = user.passwordHash;
    this.role = user.role;
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
