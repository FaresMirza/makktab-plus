import { ApiProperty } from '@nestjs/swagger';

export class ProjectFileResponseDto {
  @ApiProperty()
  publicId: string;

  @ApiProperty()
  fileName: string;

  @ApiProperty()
  fileUrl: string;

  @ApiProperty()
  fileSize: number;

  @ApiProperty()
  mimeType: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ required: false })
  uploadedBy?: {
    publicId: string;
    fullName: string;
    email: string;
    username: string;
  };
}
