import { Request, Response } from 'express';

export default interface IBaseService {
  execute(req: Request, res: Response): Promise<void>;
}
