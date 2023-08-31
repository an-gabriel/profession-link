import { Connection } from 'typeorm';
import { inject, injectable } from 'inversify';
import { Profession } from '../../entities/profession.entity';
import { BaseService } from '../../../../common/services/IBase.service';
import { UpdateProfessionRequest } from '../../interfaces/profession.interface';

@injectable()
export class UpdateProfessionService extends BaseService<Profession> {
  constructor(
    @inject('ConnectionFactory')
    connectionFactory: () => Promise<Connection>,
  ) {
    super(connectionFactory);
  }

  public async updateProfession(
    id: string,
    { descricao, situacao }: UpdateProfessionRequest,
  ): Promise<Profession | undefined> {
    const repository = await this.getRepository(Profession);
    const profession = await repository.findOne(id);

    if (profession) {
      if (descricao !== undefined) {
        profession.descricao = descricao;
      }
      if (situacao !== undefined) {
        profession.situacao = situacao;
      }

      return await repository.save(profession);
    }

    return undefined;
  }
}
