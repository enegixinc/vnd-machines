import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { multerConfig } from '../multer.config';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 10, multerConfig))
  @ApiConsumes('multipart/form-data')
  uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
    return this.filesService.uploadFiles(files);
  }
}
