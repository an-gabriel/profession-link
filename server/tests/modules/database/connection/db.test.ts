import { Container, interfaces } from 'inversify';
import 'reflect-metadata';

import { bindControllers } from '../../../../src/config/inversify-config/controllers/inversify.controllers.module';
import { bindServices } from '../../../../src/config/inversify-config/services/inversify.services.module';
import { Connection, createConnection } from 'typeorm';

describe('Database Connection', () => {
  let container: Container;

  beforeAll(async () => {
    container = new Container();

    container
      .bind<interfaces.Factory<Promise<Connection>>>('ConnectionFactory')
      .toFactory<Promise<Connection>>((context) => {
        return async () => {
          try {
            const connection = await createConnection();
            console.info('Connection to the database established');
            return connection;
          } catch (error) {
            console.error('Error establishing database connection:', error);
            throw error;
          }
        };
      });

    bindControllers(container);
    bindServices(container);
  });

  it('should establish a database connection', async () => {
    const connectionFactory =
      container.get<() => Promise<Connection>>('ConnectionFactory');

    const connection = await connectionFactory();
    expect(connection.isConnected).toBeTruthy();

    await connection.close();
  });
});
