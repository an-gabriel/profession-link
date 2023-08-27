import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from '../src/types/index';
import { IDbService } from '../src/services/base/IDB.service';
import { DbService } from '../src/services/base/DB.service';

describe('Database Connection', () => {
  let container: Container;
  let dbService: IDbService;

  beforeAll(() => {
    container = new Container();
    container.bind<IDbService>(TYPES.IDbService).to(DbService);

    dbService = container.get<IDbService>(TYPES.IDbService);
  });

  test('should connect to the database', async () => {
    const isConnected = await dbService.connect();

    expect(isConnected).toBe(true);
  });
});
