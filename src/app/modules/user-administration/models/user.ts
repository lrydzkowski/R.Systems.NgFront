import { Role } from "./role";

export interface User {
  userId: number;
  login: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: Role[]
}
