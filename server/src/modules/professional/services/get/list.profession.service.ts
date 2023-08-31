import { Connection } from 'typeorm';
import { inject, injectable } from 'inversify';
import { Professional } from '../../entities/professional.entity';
import { BaseService } from '../../../../common/services/IBase.service';
import { ProfessionalSearchFilter } from '../../interfaces/professional.interface';

@injectable()
export class ListProfessionalService extends BaseService<Professional> {
  constructor(
    @inject('ConnectionFactory')
    connectionFactory: () => Promise<Connection>,
  ) {
    super(connectionFactory);
  }

  async getProfessionalById(id: number): Promise<Professional | undefined> {
    const repository = await this.getRepository(Professional);
    return await repository.findOne(id);
  }

  async getAllProfessionals(): Promise<Professional[]> {
    const repository = await this.getRepository(Professional);
    return repository.find();
  }

  async searchProfessionals(
    filters: ProfessionalSearchFilter,
  ): Promise<Professional[]> {
    const repository = await this.getRepository(Professional);

    const queryBuilder = repository.createQueryBuilder('professional');

    if (filters.id) {
      queryBuilder.andWhere('professional.id = :id', { id: filters.id });
    }
    if (filters.nome) {
      queryBuilder.andWhere('professional.nome LIKE :nome', {
        descricao: filters.nome,
      });
    }

    if (filters.createdAt) {
      const createdAtDate = new Date(filters.createdAt);
      queryBuilder.andWhere('professional.createdAt = :createdAt', {
        createdAt: createdAtDate,
      });
    }

    if (filters.situacao !== undefined) {
      queryBuilder.andWhere('professional.situacao = :situacao', {
        situacao: filters.situacao,
      });
    }

    return queryBuilder.getMany();
  }
}
