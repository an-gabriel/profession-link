export interface IDbService {
  connect(): Promise<boolean>;
}
