import { Connection } from 'typeorm';
import { inject, injectable } from 'inversify';
import { Professional } from '../../entities/professional.entity';
import { BaseService } from '../../../../common/services/IBase.service';
import { CreateProfessionalRequest } from '../../interfaces/professional.interface';
import ProfessionalModel from 'modules/professional/models/professional.models';

@injectable()
export class CreateProfessionalService extends BaseService<Professional> {
  constructor(
    @inject('ConnectionFactory')
    connectionFactory: () => Promise<Connection>,
  ) {
    super(connectionFactory);
  }

  public async createProfessional({
    nome,
    situacao,
    telefone,
    email,
    tipoDeProfissionalId,
  }: CreateProfessionalRequest): Promise<Professional> {
    const professionalModel = new ProfessionalModel(
      nome,
      telefone,
      email,
      tipoDeProfissionalId,
      situacao,
    );

    const repository = await this.getRepository(Professional);

    return await repository.save(professionalModel);
  }
}
