import { Connection, Repository } from 'typeorm';
import { UpdateProfessionalService } from '../../../../../src/modules/professional/services/update/update.professional.service';
import { Professional } from '../../../../../src/modules/professional/entities/professional.entity';

export default class MockUpdateProfessionalService extends UpdateProfessionalService {
  private mockRepository: Repository<Professional>;

  constructor(mockRepository: Repository<Professional>) {
    super(async () => ({}) as Connection); // Fornecer uma função vazia para o connectionFactory
    this.mockRepository = mockRepository;
  }

  async getRepository(entityClass: any): Promise<Repository<any>> {
    return this.mockRepository;
  }
}
