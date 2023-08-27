import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import IBaseService from '../../../../common/shared/services/base/IBase.service';

import ProfessionModel from '../../models/profession.models';

@injectable()
export class ListProfessionService implements IBaseService {
  constructor() {}

  public async execute(req: Request, res: Response): Promise<void> {
    try {
      const profession = new ProfessionModel(
        'test',
        true,
        new Date(),
        new Date(),
      );

      res.status(200).json(profession.getFullObject());
    } catch (error) {
      res.status(500).send({ message: (error as Error).message });
    }
  }
}
