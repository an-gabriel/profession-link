import { Connection, Repository } from 'typeorm';
import { Profession } from '../../../../../src/modules/profession/entities/profession.entity';
import { DeleteProfessionService } from '../../../../../src/modules/profession/services/delete/delete.profession.service';

export default class MockDeleteProfessionService extends DeleteProfessionService {
  private mockRepository: Repository<Profession>;

  constructor(mockRepository: Repository<Profession>) {
    super(async () => ({}) as Connection);
    this.mockRepository = mockRepository;
  }

  async getRepository(entityClass: any): Promise<Repository<any>> {
    return this.mockRepository;
  }
}
