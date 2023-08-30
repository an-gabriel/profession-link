import { Connection, Repository } from 'typeorm';
import { Profession } from '../../../../../src/modules/profession/entities/profession.entity';
import { ListProfessionService } from '../../../../../src/modules/profession/services/get/list.profession.service';

export default class MockListProfessionService extends ListProfessionService {
  private mockRepository: Repository<Profession>;

  constructor(mockRepository: Repository<Profession>) {
    super(async () => ({}) as Connection); // Fornecer uma função vazia para o connectionFactory
    this.mockRepository = mockRepository;
  }

  async getRepository(entityClass: any): Promise<Repository<any>> {
    return this.mockRepository;
  }
}
