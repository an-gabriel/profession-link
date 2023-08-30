import 'dotenv/config';
import cors from 'cors';
import { InversifyExpressServer } from 'inversify-express-utils';
import swaggerUi from 'swagger-ui-express';
import * as express from 'express';
import logger from './logger';
import { DiContainer } from './di.container';

export async function configureServer(): Promise<express.Application> {
  try {
    const container = await DiContainer.getContainer();
    const server = new InversifyExpressServer(container);

    server.setConfig((app) => {
      app.use(cors());
      app.use(express.json());
      app.use((req, res, next) => {
        if (!req.url.split('/').includes('doc')) {
          logger.info(req.url);
        }
        next();
      });
      const swaggerFile = require('../../swagger_output.json') as any;
      app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
    });

    return server.build();
  } catch (error) {
    console.error('Error creating container:', error);
    throw error;
  }
}
