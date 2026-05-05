import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  HttpStatus,
  ParseFilePipe,
  MaxFileSizeValidator,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { randomUUID } from 'crypto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ProjectFilesService } from './project-files.service';

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB

@Controller('projects')
export class ProjectFilesController {
  constructor(private readonly projectFilesService: ProjectFilesService) {}

  /**
   * Upload a file to a project
   * POST /projects/:publicId/files
   * Body: multipart/form-data with field name "file"
   */
  @UseGuards(JwtAuthGuard)
  @Post(':publicId/files')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads', 'projects'),
        filename: (_req, file, cb) => {
          const ext = extname(file.originalname);
          const unique = `${Date.now()}-${randomUUID()}${ext}`;
          cb(null, unique);
        },
      }),
      limits: { fileSize: MAX_FILE_SIZE },
    }),
  )
  async uploadFile(
    @Param('publicId') publicId: string,
    @Req() req: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE })],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    const userPublicId = req.user.userId;
    return this.projectFilesService.uploadFile(publicId, userPublicId, file);
  }

  /**
   * List all files for a project
   * GET /projects/:publicId/files
   */
  @UseGuards(JwtAuthGuard)
  @Get(':publicId/files')
  async listFiles(@Param('publicId') publicId: string, @Req() req: any) {
    const userPublicId = req.user.userId;
    return this.projectFilesService.listFiles(publicId, userPublicId);
  }

  /**
   * Delete a project file
   * DELETE /projects/files/:filePublicId
   */
  @UseGuards(JwtAuthGuard)
  @Delete('files/:filePublicId')
  @HttpCode(HttpStatus.OK)
  async deleteFile(@Param('filePublicId') filePublicId: string, @Req() req: any) {
    const userPublicId = req.user.userId;
    return this.projectFilesService.deleteFile(filePublicId, userPublicId);
  }
}
