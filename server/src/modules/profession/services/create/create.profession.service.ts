import { Connection } from 'typeorm';
import { inject, injectable } from 'inversify';
import { Profession } from '../../entities/profession.entity';
import { BaseService } from '../../../../common/services/IBase.service';
import { CreateProfessionRequest } from '../../interfaces/profession.interface';

@injectable()
export class CreateProfessionService extends BaseService<Profession> {
  constructor(
    @inject('ConnectionFactory')
    connectionFactory: () => Promise<Connection>,
  ) {
    super(connectionFactory);
  }

  public async createProfession({
    descricao,
    situacao,
  }: CreateProfessionRequest): Promise<Profession> {
    const profession = new Profession();

    profession.descricao = descricao;
    profession.situacao = situacao;

    const repository = await this.getRepository(Profession);

    return await repository.save(profession);
  }
}
