import { injectable } from 'inversify';
import { IDbService } from './IDB.service';

@injectable()
export class DbService implements IDbService {
  async connect(): Promise<boolean> {
    return true;
  }
}
