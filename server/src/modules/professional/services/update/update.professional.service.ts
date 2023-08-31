import { Connection } from 'typeorm';
import { inject, injectable } from 'inversify';
import { Professional } from '../../entities/professional.entity';
import { BaseService } from '../../../../common/services/IBase.service';
import { UpdateProfessionalRequest } from '../../interfaces/professional.interface';

@injectable()
export class UpdateProfessionalService extends BaseService<Professional> {
  constructor(
    @inject('ConnectionFactory')
    connectionFactory: () => Promise<Connection>,
  ) {
    super(connectionFactory);
  }

  public async updateProfessional(
    id: string,
    updateRequest: UpdateProfessionalRequest,
  ): Promise<Professional | undefined> {
    const repository = await this.getRepository(Professional);
    const professional = await repository.findOne(id);

    if (!professional) {
      return undefined;
    }

    const cleanedUpdateRequest = this.removeEmptyFields(updateRequest);
    Object.assign(professional, cleanedUpdateRequest);

    const updatedProfessional = await repository.save(professional);
    return updatedProfessional;
  }

  private removeEmptyFields<T>(obj: T): Partial<T> {
    const cleanedObj: Partial<T> = {};

    for (const key in obj) {
      const value = obj[key as keyof T];
      if (value !== undefined && value !== null && value !== '') {
        cleanedObj[key as keyof T] = value;
      }
    }

    return cleanedObj;
  }
}
