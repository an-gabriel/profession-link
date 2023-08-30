import { Connection } from 'typeorm';
import { injectable, inject } from 'inversify';
import { Profession } from '../../entities/profession.entity';
import { BaseService } from '../../../../common/services/IBase.service';

@injectable()
export class DeleteProfessionService extends BaseService<Profession> {
  constructor(
    @inject('ConnectionFactory')
    connectionFactory: () => Promise<Connection>,
  ) {
    super(connectionFactory);
  }

  public async softDeleteProfession(id: string): Promise<boolean> {
    const repository = await this.getRepository(Profession);
    const profession = await repository.findOne(id);

    if (profession) {
      await repository.softRemove(profession);
      return true;
    }

    return false;
  }
}
