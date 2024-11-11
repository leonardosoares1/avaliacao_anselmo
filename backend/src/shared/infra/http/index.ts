import cors from 'cors';
import express from 'express';

import 'express-async-errors';

import multerConfig from '@config/multer';

import ErrorHandler from './middlewares/ErrorHandler';
import routes from './routes';

const http = express();
const errorHandler = new ErrorHandler();

http.use(cors());
http.use(express.json());
http.use('/files', express.static(multerConfig.uploadsFolder));
http.use(routes);
http.use(errorHandler.execute);

export default http;
