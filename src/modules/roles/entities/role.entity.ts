import { ApiProperty } from '@nestjs/swagger';

export class Role {
  id: string;
  key: string;
  scope: string;
  name: string;
  description: string;
  createdAt: Date;
}
