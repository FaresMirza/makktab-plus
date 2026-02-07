import { UserStatus } from 'prisma/src/generated/prisma-client/client';

export class User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  username: string;
  roles: string[];
  status: UserStatus;
  createdAt: Date;
}
