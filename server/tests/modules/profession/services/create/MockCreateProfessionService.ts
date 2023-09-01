import { Connection, Repository } from 'typeorm';
import { Profession } from '../../../../../src/modules/profession/entities/profession.entity';
import { CreateProfessionService } from '../../../../../src/modules/profession/services/create/create.profession.service';

export default class MockCreateProfessionService extends CreateProfessionService {
  private mockRepository: Repository<Profession>;

  constructor(mockRepository: Repository<Profession>) {
    super(async () => ({}) as Connection);
    this.mockRepository = mockRepository;
  }

  async getRepository(entityClass: any): Promise<Repository<any>> {
    return this.mockRepository;
  }

  async findOne(id: any): Promise<Profession | undefined> {
    return new Profession();
  }
}
