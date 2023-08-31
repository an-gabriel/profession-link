import { Connection, Repository } from 'typeorm';
import { UpdateProfessionService } from '../../../../../src/modules/profession/services/update/update.profession.service';
import { Profession } from '../../../../../src/modules/profession/entities/profession.entity';

export default class MockUpdateProfessionService extends UpdateProfessionService {
  private mockRepository: Repository<Profession>;

  constructor(mockRepository: Repository<Profession>) {
    super(async () => ({}) as Connection); // Fornecer uma função vazia para o connectionFactory
    this.mockRepository = mockRepository;
  }

  async getRepository(entityClass: any): Promise<Repository<any>> {
    return this.mockRepository;
  }
}
