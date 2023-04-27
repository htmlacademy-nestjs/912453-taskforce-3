import {UserRole} from './user-role.enum';
import {City} from './user-city.enum';

export interface UserInterface {
  _id?: string;
  name: string;
  city: City;
  email: string;
  avatar: string;
  dateBirth: Date;
  passwordHash: string;
  role: UserRole;
}
