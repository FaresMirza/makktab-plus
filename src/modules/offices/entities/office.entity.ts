import { OfficeStatus } from 'prisma/src/generated/prisma-client/client';

export class Office {
  id: number;
  publicId: string;
  name: string;
  ownerUserId: number;
  status: OfficeStatus;
  createdAt: Date;
}
