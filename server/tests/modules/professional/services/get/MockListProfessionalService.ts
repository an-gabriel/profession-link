import { Connection, Repository } from 'typeorm';
import { Professional } from '../../../../../src/modules/professional/entities/professional.entity';
import { ListProfessionalService } from '../../../../../src/modules/professional/services/get/list.profession.service';

export default class MockListProfessionalService extends ListProfessionalService {
  private mockRepository: Repository<Professional>;

  constructor(mockRepository: Repository<Professional>) {
    super(async () => ({}) as Connection); // Fornecer uma função vazia para o connectionFactory
    this.mockRepository = mockRepository;
  }

  async getRepository(entityClass: any): Promise<Repository<any>> {
    return this.mockRepository;
  }
}
