import { OfficeStatus } from 'prisma/src/generated/prisma-client/client';

export class Office {
  id: string;
  name: string;
  ownerUserId: string;
  status: OfficeStatus;
  createdAt: Date;
}
