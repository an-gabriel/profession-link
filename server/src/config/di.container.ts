import { Container, interfaces } from 'inversify';
import { bindControllers } from './inversify-config/controllers/inversify.controllers.module';
import { bindServices } from './inversify-config/services/inversify.services.module';
import { Connection, createConnection } from 'typeorm';

export class DiContainer {
  private static container: Container;
  private static connectionPromise: Promise<Connection> | null = null;

  public static async getContainer(): Promise<Container> {
    if (!this.container) {
      this.container = new Container();

      this.container
        .bind<interfaces.Factory<Promise<Connection>>>('ConnectionFactory')
        .toFactory<Promise<Connection>>((context) => {
          if (this.connectionPromise === null) {
            this.connectionPromise = this.createDatabaseConnection();
          }
          return async () => this.connectionPromise!;
        });

      bindControllers(this.container);
      bindServices(this.container);
    }
    return this.container;
  }

  private static async createDatabaseConnection(): Promise<Connection> {
    try {
      const connection = await createConnection();
      console.info('Connection to the database established');
      return connection;
    } catch (error) {
      console.error('Error establishing database connection:', error);
      throw error; // Re-throw the error to be handled upstream
    }
  }
}
