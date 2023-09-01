import { Connection, Repository } from 'typeorm';
import { Professional } from '../../../../../src/modules/professional/entities/professional.entity';
import { CreateProfessionalService } from '../../../../../src/modules/professional/services/create/create.professional.service';
import { Profession } from '../../../../../src/modules/profession/entities/profession.entity';

export default class MockCreateProfessionalService extends CreateProfessionalService {
  private mockProfessionalRepository: Repository<Professional>;
  private mockProfessionRepository: Repository<Profession>;

  constructor(
    mockProfessionalRepository: Repository<Professional>,
    mockProfessionRepository: Repository<Profession>,
  ) {
    super(async () => ({}) as Connection);
    this.mockProfessionalRepository = mockProfessionalRepository;
    this.mockProfessionRepository = mockProfessionRepository;
  }

  async getRepository(entityClass: any): Promise<Repository<any>> {
    if (entityClass === Profession) {
      return this.mockProfessionRepository;
    }
    return this.mockProfessionalRepository;
  }
}
