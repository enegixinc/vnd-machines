import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'node:fs';

@Injectable()
export class FilesService {
  async uploadFiles(files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files were uploaded.');
    }

    const uploadedFiles = files.map((file) => ({
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      url: `http://localhost:3000/uploads/${file.filename}`,
    }));

    return { files: uploadedFiles };
  }

  async deleteFiles(filenames: string[]) {
    if (!filenames || filenames.length === 0) {
      throw new BadRequestException('No files were deleted.');
    }

    filenames.forEach((filename) => {
      fs.unlink(`./uploads/${filename}`, (err) => {
        if (err) {
          throw new BadRequestException('Failed to delete file.');
        }
      });
    });

    return { message: 'Files deleted successfully.' };
  }
}
