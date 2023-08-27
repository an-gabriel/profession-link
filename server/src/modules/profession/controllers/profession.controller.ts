import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { ListProfessionService } from '../services/get/list.profession.service';
import IBaseService from 'common/shared/services/base/IBase.service';

@controller('/api/v1/profession')
export class ProfessionController {
  constructor(
    @inject(ListProfessionService) private listProfessionService: IBaseService,
  ) {}

  @httpGet('/list')
  public async listBase(req: Request, res: Response) {
    return this.listProfessionService.execute(req, res);
  }
}
