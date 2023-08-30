import { Connection, Repository, EntityTarget, ObjectLiteral } from 'typeorm';
import { inject, injectable } from 'inversify';

@injectable()
export abstract class BaseService<Entity extends ObjectLiteral> {
  constructor(
    @inject('ConnectionFactory')
    private connectionFactory: () => Promise<Connection>,
  ) {}

  private async getConnection(): Promise<Connection> {
    const connection = await this.connectionFactory();
    return connection;
  }

  protected async getRepository(
    entityClass: EntityTarget<Entity>,
  ): Promise<Repository<Entity>> {
    const connection = await this.getConnection();
    return connection.getRepository(entityClass);
  }
}
