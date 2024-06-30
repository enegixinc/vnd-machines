import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { multerConfig } from './multer.config';

@Controller('files')
@ApiBearerAuth('access-token')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 10, multerConfig))
  @ApiConsumes('multipart/form-data')
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
    return await this.filesService.uploadFiles(files);
  }
}
