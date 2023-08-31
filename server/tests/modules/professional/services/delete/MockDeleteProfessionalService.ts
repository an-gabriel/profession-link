import { Connection, Repository } from 'typeorm';
import { Professional } from '../../../../../src/modules/professional/entities/professional.entity';
import { DeleteProfessionalService } from '../../../../../src/modules/professional/services/delete/delete.professional.service';

export default class MockDeleteProfessionalService extends DeleteProfessionalService {
  private mockRepository: Repository<Professional>;

  constructor(mockRepository: Repository<Professional>) {
    super(async () => ({}) as Connection);
    this.mockRepository = mockRepository;
  }

  async getRepository(entityClass: any): Promise<Repository<any>> {
    return this.mockRepository;
  }
}
