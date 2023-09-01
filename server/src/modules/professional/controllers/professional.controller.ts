import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from 'inversify-express-utils';
import { ListProfessionalService } from '../services/get/list.profession.service';
import { UpdateProfessionalService } from '../services/update/update.professional.service';
import { DeleteProfessionalService } from '../services/delete/delete.professional.service';
import { CreateProfessionalService } from '../services/create/create.professional.service';

import logger from '../../../config/logger';
import {
  CreateProfessionalRequest,
  ProfessionalSearchFilter,
  UpdateProfessionalRequest,
} from '../interfaces/professional.interface';

@controller('/api/v1/professional')
export class ProfessionalController {
  constructor(
    @inject(ListProfessionalService)
    private listProfessionalService: ListProfessionalService,
    @inject(CreateProfessionalService)
    private createProfessionalService: CreateProfessionalService,
    @inject(UpdateProfessionalService)
    private updateProfessionalService: UpdateProfessionalService,
    @inject(DeleteProfessionalService)
    private deleteProfessionalService: DeleteProfessionalService,
  ) {}

  /**
   * @swagger
   * tags:
   *   name: Professional
   *   description: Professional management
   */

  /**
   * @swagger
   * /api/v1/professional/list:
   *   get:
   *     summary: Get a list of professionals
   *     tags: [Professional]
   *     responses:
   *       200:
   *         description: List of professionals
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Professional'
   */
  @httpGet('/list')
  public async listBase(req: Request, res: Response) {
    try {
      const result = await this.listProfessionalService.getAllProfessionals();
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
   * tags:
   *   name: Professional
   *   description: API endpoints for managing professionals
   *
   * components:
   *   schemas:
   *     Professional:
   *       type: object
   *       properties:
   *         nome:
   *           type: string
   *         telefone:
   *           type: string
   *         email:
   *           type: string
   *         tipoDeProfissional:
   *           type: string
   *         situacao:
   *           type: boolean
   *
   *     CreateProfessionalRequest:
   *       type: object
   *       properties:
   *         nome:
   *           type: string
   *           example: John Doe
   *         telefone:
   *           type: string
   *           example: 123-456-7890
   *         email:
   *           type: string
   *           example: johndoe@example.com
   *         tipoDeProfissional:
   *           type: string
   *           example: Engineer
   *         situacao:
   *           type: boolean
   *           example: true
   *
   * /api/v1/professional/create:
   *   post:
   *     summary: Create a new professional
   *     tags: [Professional]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateProfessionalRequest'
   *     responses:
   *       201:
   *         description: Professional created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Professional'
   */

  @httpPost('/create')
  public async createBase(
    req: Request<{}, {}, CreateProfessionalRequest>,
    res: Response,
  ) {
    try {
      const requestData = req.body;
      const createdProfessional =
        await this.createProfessionalService.createProfessional(requestData);
      return res.status(201).json(createdProfessional);
    } catch (error) {
      logger.error('An error occurred:', error);
      return res
        .status(500)
        .json({ error: `An error occurred: ${(error as Error).message}` });
    }
  }
  /**
   * @swagger
   * tags:
   *   name: Professional
   *   description: API endpoints for managing professionals
   *
   * components:
   *   schemas:
   *     Professional:
   *       type: object
   *       properties:
   *         nome:
   *           type: string
   *         telefone:
   *           type: string
   *         email:
   *           type: string
   *         tipoDeProfissional:
   *           type: string
   *         situacao:
   *           type: boolean
   *
   *     UpdateProfessionalRequest:
   *       type: object
   *       properties:
   *         nome:
   *           type: string
   *           example: John Doe
   *         telefone:
   *           type: string
   *           example: 123-456-7890
   *         email:
   *           type: string
   *           example: johndoe@example.com
   *         tipoDeProfissional:
   *           type: number
   *           example: 1
   *         situacao:
   *           type: boolean
   *           example: true
   *
   * /api/v1/professional/update/{id}:
   *   put:
   *     summary: Update professional details
   *     tags: [Professional]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the professional to be updated
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateProfessionalRequest'
   *     responses:
   *       200:
   *         description: Professional updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Professional'
   *       404:
   *         description: Professional not found
   */

  @httpPut('/update/:id')
  public async updateBase(
    req: Request<{ id: string }, {}, UpdateProfessionalRequest>,
    res: Response,
  ) {
    try {
      const professionalId = req.params.id;
      const { nome, situacao } = req.body;
      const updatedProfessional =
        await this.updateProfessionalService.updateProfessional(
          professionalId,
          {
            nome,
            situacao,
          },
        );

      if (updatedProfessional) {
        return res.status(200).json(updatedProfessional);
      } else {
        return res.status(404).json({ message: 'Professional not found' });
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
   * /api/v1/professional/delete/{id}:
   *   delete:
   *     summary: Soft delete a professional
   *     tags: [Professional]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the professional to be deleted
   *     responses:
   *       200:
   *         description: Professional deleted successfully
   *       404:
   *         description: Professional not found
   */

  @httpDelete('/delete/:id')
  public async deleteBase(req: Request, res: Response) {
    try {
      const professionalId = req.params.id;
      const deleted =
        await this.deleteProfessionalService.softDeleteProfessional(
          professionalId,
        );
      if (deleted) {
        return res
          .status(200)
          .json({ message: 'Professional deleted successfully' });
      } else {
        return res.status(404).json({ message: 'Professional not found' });
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
   * /api/v1/professional/search:
   *   get:
   *     summary: Search professionals
   *     tags: [Professional]
   *     parameters:
   *       - in: query
   *         name: id
   *         schema:
   *           type: string
   *         description: ID of the professional
   *       - in: query
   *         name: nome
   *         schema:
   *           type: string
   *         description: nome of the professional
   *       - in: query
   *         name: createdAt
   *         schema:
   *           type: string
   *         description: Creation date of the professional
   *       - in: query
   *         name: situacao
   *         schema:
   *           type: boolean
   *         description: Status of the professional
   *     responses:
   *       200:
   *         description: List of professionals that match the search criteria
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Professional'
   */
  @httpGet('/search')
  public async searchProfessionals(req: Request, res: Response) {
    try {
      const filters: ProfessionalSearchFilter = req.query;
      const result =
        await this.listProfessionalService.searchProfessionals(filters);
      return res.status(200).json(result);
    } catch (error) {
      logger.error('An error occurred:', error);
      return res
        .status(500)
        .json({ error: `An error occurred: ${(error as Error).message}` });
    }
  }
}
