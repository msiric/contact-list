import crypto from 'crypto';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import path from 'path';
import { upload as validation } from '../common/constants.js';
import { bucket } from '../config/constants.js';
import { mongo } from '../config/secret.js';

const storage = new GridFsStorage({
  url: mongo.database,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) return reject(err);
        const fileName = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = { fileName, bucketName: bucket };
        resolve(fileInfo);
      });
    });
  },
});

const limits = {
  fileSize: validation.contact.fileSize,
};

const fileFilter = (_req, file, cb) => {
  if (validation.contact.mimeTypes.includes(file.mimetype)) cb(null, true);
  else
    cb(
      new Error('Invalid mime type, only JPEG, PNG and GIF files are allowed'),
      false
    );
};

export const upload = multer({ storage, fileFilter, limits });
