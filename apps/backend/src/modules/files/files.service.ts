import { BadRequestException, Injectable } from '@nestjs/common';
import { promises as fs } from 'node:fs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './file.entity';
import { ConfigService } from '@backend/config';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
    private readonly configService: ConfigService
  ) {}

  async uploadFiles(files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files were uploaded.');
    }

    const uploadedFiles = [];
    for (const file of files) {
      const newFile = new FileEntity();
      newFile.filename = file.filename;
      newFile.originalname = file.originalname;
      newFile.size = file.size;
      newFile.url = `${this.configService.get('BACKEND_APP_URL')}/uploads/${
        file.filename
      }`;
      await this.fileRepository.save(newFile);
      uploadedFiles.push(newFile);
    }

    return { files: uploadedFiles };
  }

  async deleteFile(id: string) {
    try {
      const file = await this.fileRepository.findOne({ where: { _id: id } });
      if (!file) {
        throw new BadRequestException('File not found.');
      }
      await fs.unlink(`./uploads/${file.filename}`);
      await this.fileRepository.delete(id);
      return { message: 'File deleted successfully.' };
    } catch (err) {
      throw new BadRequestException('Failed to delete file.');
    }
  }
}
