import { UserRole } from "./user-role.enum";

export interface SubscriberInterface {
  id?: string;
  email: string;
  name: string;
  role: UserRole;
}
