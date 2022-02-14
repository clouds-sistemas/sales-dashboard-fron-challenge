import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

const uploadsFolder = path.resolve(__dirname, '..', 'uploads/');

export default {
  uploadsFolder,
  multer: {
    storage: multer.diskStorage({
      destination: uploadsFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const filename = `${fileHash}-${file.originalname}`;

        return callback(null, filename);
      }
    })
  }
};
