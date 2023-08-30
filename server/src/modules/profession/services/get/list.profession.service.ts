import { Connection } from 'typeorm';
import { inject, injectable } from 'inversify';
import { Profession } from '../../entities/profession.entity';
import { BaseService } from '../../../../common/services/IBase.service';
import { ProfessionSearchFilter } from '../../interfaces/profession.interface';

@injectable()
export class ListProfessionService extends BaseService<Profession> {
  constructor(
    @inject('ConnectionFactory')
    connectionFactory: () => Promise<Connection>,
  ) {
    super(connectionFactory);
  }

  async getProfessionById(id: number): Promise<Profession | undefined> {
    const repository = await this.getRepository(Profession);
    return await repository.findOne(id);
  }

  async getAllProfessions(): Promise<Profession[]> {
    const repository = await this.getRepository(Profession);
    return repository.find();
  }

  async searchProfessions(
    filters: ProfessionSearchFilter,
  ): Promise<Profession[]> {
    const repository = await this.getRepository(Profession);

    const queryBuilder = repository.createQueryBuilder('profession');

    if (filters.id) {
      queryBuilder.andWhere('profession.id = :id', { id: filters.id });
    }
    console.log(filters);
    if (filters.name) {
      queryBuilder.andWhere('profession.descricao LIKE :descricao', {
        descricao: filters.name,
      });
    }

    if (filters.createdAt) {
      const createdAtDate = new Date(filters.createdAt);
      queryBuilder.andWhere('profession.createdAt = :createdAt', {
        createdAt: createdAtDate,
      });
    }

    if (filters.status !== undefined) {
      queryBuilder.andWhere('profession.situacao = :status', {
        situacao: filters.status,
      });
    }

    return queryBuilder.getMany();
  }
}
