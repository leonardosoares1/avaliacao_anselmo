import { Router } from 'express';
import multer from 'multer';

import multerConfig from '@config/multer';

import FilesController from '../controllers/FilesController';

const filesRouter = Router();
const filesController = new FilesController();
const uploadConfig = multer(multerConfig);

filesRouter.post('/', uploadConfig.single('file'), filesController.create);

export default filesRouter;
