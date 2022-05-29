import { Role } from './role';

export interface User {
  userId: number;
  login: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: Role[];
  createdDateTime: Date;
  creatorId: number;
  creatorLogin: string;
  lastEditedDateTime: Date | null;
  lastEditorId: number | null;
  lastEditorLogin: string | null;
}
