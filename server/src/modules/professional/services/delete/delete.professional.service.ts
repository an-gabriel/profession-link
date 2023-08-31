import { Connection } from 'typeorm';
import { injectable, inject } from 'inversify';
import { Professional } from '../../entities/professional.entity';
import { BaseService } from '../../../../common/services/IBase.service';

@injectable()
export class DeleteProfessionalService extends BaseService<Professional> {
  constructor(
    @inject('ConnectionFactory')
    connectionFactory: () => Promise<Connection>,
  ) {
    super(connectionFactory);
  }

  public async softDeleteProfessional(id: string): Promise<boolean> {
    const repository = await this.getRepository(Professional);
    const professional = await repository.findOne(id);

    if (professional) {
      await repository.softRemove(professional);
      return true;
    }

    return false;
  }
}
