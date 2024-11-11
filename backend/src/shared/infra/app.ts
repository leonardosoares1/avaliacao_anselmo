import 'dotenv/config';
import 'reflect-metadata';

import http from 'node:http';

import generalConfig from '@config/general';

import dateAdapter from '@shared/adapters/date';

import TypeOrm from './database/typeorm';
import httpServer from './http';

const server = http.createServer(httpServer);

TypeOrm.initialize()
  .then(() => {
    server.listen(generalConfig.port, () => {
      console.log(
        `\n\n ${generalConfig.name} iniciado na porta ${
          generalConfig.port
        } em ${dateAdapter.getCurrentDate().toUTCString()}`,
      );
    });
  })
  .catch(err => {
    console.log(err);
    console.log('Falha ao conectar no banco de dados');
  });
