import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';
import ShortUniqueId from 'short-unique-id';

export const multerConfig: MulterOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const id = new ShortUniqueId({ length: 5 }).rnd();
      const originalFileName = file.originalname.replace(/\.[^.]+$/, '');
      cb(null, `${originalFileName}-${id}${extname(file.originalname)}`);
    },
  }),
  limits: {
    fileSize: 8 * 1024 * 1024, // 8 MB
  },
  preservePath: true,
};
