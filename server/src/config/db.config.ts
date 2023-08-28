import { createConnection } from 'typeorm';
import logger from './logger';

createConnection()
  .then(() => logger.info('Connection database established'))
  .catch((error) => logger.error('connection database failed', error));
