import multer from 'multer';
import path from 'node:path';

import getRootPath from '@shared/helpers/getRootPath';

function getTempFolder(): string {
  return path.resolve(getRootPath(), '..', 'files');
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
