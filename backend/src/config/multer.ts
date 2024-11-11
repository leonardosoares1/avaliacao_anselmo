import multer from 'multer';
import path from 'node:path';

import getRootPath from '@shared/helpers/getRootPath';

import generalConfig from './general';

function getTempFolder(): string {
  let tmpFolder = path.resolve(getRootPath(), 'files');
  if (generalConfig.environment === 'development') {
    tmpFolder = path.resolve(getRootPath(), '..', 'files');
  }
  return tmpFolder;
}

const multerConfig = {
  tmpFolder: getTempFolder(),
  uploadsFolder: path.resolve(getTempFolder(), 'uploads'),
  storage: multer.diskStorage({
    destination: getTempFolder(),
    filename(_, file, callback) {
      const hash = Date.now();
      const fileName = `${hash}_${file.originalname}`;
      return callback(null, fileName);
    },
  }),
};

export default multerConfig;
