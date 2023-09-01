import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  queryParam,
} from 'inversify-express-utils';
import { ListProfessionService } from '../services/get/list.profession.service';
import { UpdateProfessionService } from '../services/update/update.profession.service';
import { DeleteProfessionService } from '../services/delete/delete.profession.service';
import { CreateProfessionService } from '../services/create/create.profession.service';

import logger from '../../../config/logger';
import {
  CreateProfessionRequest,
  ProfessionSearchFilter,
  UpdateProfessionRequest,
} from '../interfaces/profession.interface';

@controller('/api/v1/profession')
export class ProfessionController {
  constructor(
    @inject(ListProfessionService)
    private listProfessionService: ListProfessionService,
    @inject(CreateProfessionService) // Injete o serviço de criação
    private createProfessionService: CreateProfessionService,
    @inject(UpdateProfessionService)
    private updateProfessionService: UpdateProfessionService,
    @inject(DeleteProfessionService)
    private deleteProfessionService: DeleteProfessionService,
  ) {}
  /**
   * @swagger
   * /api/v1/profession/list:
   *   get:
   *     summary: Get a list of professions
   *     tags:
   *       - Profession
   *     responses:
   *       200:
   *         description: List of professions
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                   descricao:
   *                     type: string
   *                   situacao:
   *                     type: boolean
   */
  @httpGet('/list')
  public async listBase(req: Request, res: Response) {
    try {
      const result = await this.listProfessionService.getAllProfessions();
      return res.status(200).json(result);
    } catch (error) {
      logger.error('An error occurred:', error);
      return res
        .status(500)
        .json({ error: `An error occurred: ${(error as Error).message}` });
    }
  }

  /**
   * @swagger
   * /api/v1/profession/create:
   *   post:
   *     summary: Create a new profession
   *     tags:
   *       - Profession
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               descricao:
   *                 type: string
   *               situacao:
   *                 type: boolean
   *             required:
   *               - descricao
   *     responses:
   *       201:
   *         description: Profession created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Profession'
   */
  @httpPost('/create')
  public async createBase(
    req: Request<{}, {}, CreateProfessionRequest>,
    res: Response,
  ) {
    try {
      const data = req.body;
      const createdProfession =
        await this.createProfessionService.createProfession(data);
      return res.status(201).json(createdProfession);
    } catch (error) {
      logger.error('An error occurred:', error);
      return res
        .status(500)
        .json({ error: `An error occurred: ${(error as Error).message}` });
    }
  }

  /**
   * @swagger
   * /api/v1/profession/update/{id}:
   *   put:
   *     summary: Update profession description
   *     tags:
   *       - Profession
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the profession to be updated
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               descricao:
   *                 type: string
   *               situacao:
   *                 type:
   *             required:
   *               - descricao
   *     responses:
   *       200:
   *         description: Profession updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Profession'
   *       404:
   *         description: Profession not found
   */
  @httpPut('/update/:id')
  public async updateBase(
    req: Request<{ id: string }, {}, UpdateProfessionRequest>,
    res: Response,
  ) {
    try {
      const professionId = req.params.id;
      const data = req.body;
      const updatedProfession =
        await this.updateProfessionService.updateProfession(professionId, data);

      if (updatedProfession) {
        return res.status(200).json(updatedProfession);
      } else {
        return res.status(404).json({ message: 'Profession not found' });
      }
    } catch (error) {
      logger.error('An error occurred:', error);
      return res
        .status(500)
        .json({ error: `An error occurred: ${(error as Error).message}` });
    }
  }

  /**
   * @swagger
   * /api/v1/profession/delete/{id}:
   *   delete:
   *     summary: Soft delete a profession
   *     tags:
   *       - Profession
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the profession to be deleted
   *     responses:
   *       200:
   *         description: Profession deleted successfully
   *       404:
   *         description: Profession not found
   */
  @httpDelete('/delete/:id')
  public async deleteBase(req: Request, res: Response) {
    try {
      const professionId = req.params.id;
      const deleted =
        await this.deleteProfessionService.softDeleteProfession(professionId);
      if (deleted) {
        return res
          .status(200)
          .json({ message: 'Profession deleted successfully' });
      } else {
        return res.status(404).json({ message: 'Profession not found' });
      }
    } catch (error) {
      logger.error('An error occurred:', error);
      return res
        .status(500)
        .json({ error: `An error occurred: ${(error as Error).message}` });
    }
  }

  /**
   * @swagger
   * /api/v1/profession/search:
   *   get:
   *     summary: Search professions
   *     tags:
   *       - Profession
   *     parameters:
   *       - in: query
   *         name: id
   *         schema:
   *           type: string
   *         description: ID of the profession
   *       - in: query
   *         name: descricao
   *         schema:
   *           type: string
   *         description: descricao of the profession
   *       - in: query
   *         name: createdAt
   *         schema:
   *           type: string
   *         description: Creation date of the profession
   *       - in: query
   *         name: status
   *         schema:
   *           type: boolean
   *         description: Status of the profession
   *     responses:
   *       200:
   *         description: List of professions that match the search criteria
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                   descricao:
   *                     type: string
   *                   situacao:
   *                     type: boolean
   */
  @httpGet('/search')
  public async searchProfessions(req: Request, res: Response) {
    try {
      const filters: ProfessionSearchFilter = req.query;
      const result =
        await this.listProfessionService.searchProfessions(filters);
      return res.status(200).json(result);
    } catch (error) {
      logger.error('An error occurred:', error);
      return res
        .status(500)
        .json({ error: `An error occurred: ${(error as Error).message}` });
    }
  }
}
