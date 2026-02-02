import type { Role } from '../constants/roles';

export interface User {
  id: string;
  email: string;
  username: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
