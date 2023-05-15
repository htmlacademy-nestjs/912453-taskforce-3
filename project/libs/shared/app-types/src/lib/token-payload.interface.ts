import { UserRole } from './user-role.enum';

export interface TokenPayloadInterface {
  sub: string;
  name: string;
  email: string;
  role: UserRole;
}
