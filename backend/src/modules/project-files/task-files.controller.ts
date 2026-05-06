import {
  Controller,
  Post,
  Get,
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

/**
 * Files attached to a specific task. Reuses the ProjectFile model with
 * a non-null `taskId`; the FK cascades on task delete so cleanup is free.
 */
@Controller('tasks')
export class TaskFilesController {
  constructor(private readonly projectFilesService: ProjectFilesService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':taskPublicId/files')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads', 'projects'),
        filename: (_req, file, cb) => {
          const ext = extname(file.originalname);
          cb(null, `${Date.now()}-${randomUUID()}${ext}`);
        },
      }),
      limits: { fileSize: MAX_FILE_SIZE },
    }),
  )
  async uploadFile(
    @Param('taskPublicId') taskPublicId: string,
    @Req() req: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE })],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('No file provided');
    return this.projectFilesService.uploadTaskFile(taskPublicId, req.user.userId, file);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':taskPublicId/files')
  async listFiles(@Param('taskPublicId') taskPublicId: string, @Req() req: any) {
    return this.projectFilesService.listTaskFiles(taskPublicId, req.user.userId);
  }
}
