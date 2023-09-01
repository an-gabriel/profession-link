import { Connection } from 'typeorm';
import { inject, injectable } from 'inversify';
import { BaseService } from '../../../../common/services/IBase.service';
import { CreateProfessionalRequest } from '../../interfaces/professional.interface';
import { Professional } from '../../entities/professional.entity';
import { Profession } from '../../../profession/entities/profession.entity';

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
    tipoDeProfissional,
  }: CreateProfessionalRequest): Promise<Professional> {
    const professionalRepository = await this.getRepository(Professional);
    const professionRepository = await this.getRepository(Profession);

    const profession = await professionRepository.findOne(tipoDeProfissional);

    if (!profession) {
      throw new Error('Tipo de profissional não encontrado');
    }

    const professionalEntity = professionalRepository.create({
      nome,
      situacao,
      telefone,
      email,
      tipoDeProfissional: profession.id,
    });

    return professionalRepository.save(professionalEntity);
  }
}
