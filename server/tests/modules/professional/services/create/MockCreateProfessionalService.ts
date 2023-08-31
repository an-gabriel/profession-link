import { Connection, Repository } from 'typeorm';
import { Professional } from '../../../../../src/modules/professional/entities/professional.entity';
import { CreateProfessionalService } from '../../../../../src/modules/professional/services/create/create.professional.service';

export default class MockCreateProfessionalService extends CreateProfessionalService {
  private mockRepository: Repository<Professional>;

  constructor(mockRepository: Repository<Professional>) {
    super(async () => ({}) as Connection); // Fornecer uma função vazia para o connectionFactory
    this.mockRepository = mockRepository;
  }

  async getRepository(entityClass: any): Promise<Repository<any>> {
    return this.mockRepository;
  }
}
