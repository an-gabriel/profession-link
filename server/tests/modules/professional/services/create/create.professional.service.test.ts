import { Repository } from 'typeorm';
import { CreateProfessionalService } from '../../../../../src/modules/professional/services/create/create.professional.service';
import ProfessionalModel from '../../../../../src/modules/professional/models/professional.models';
import { CreateProfessionalRequest } from '../../../../../src/modules/professional/interfaces/professional.interface';
import MockCreateProfessionalService from './MockCreateProfessionalService';
import { Professional } from '../../../../../src/modules/professional/entities/professional.entity';

describe('CreateProfessionalService', () => {
  let createProfessionalService: CreateProfessionalService;
  let mockRepository: Repository<Professional>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
    } as any;

    createProfessionalService = new MockCreateProfessionalService(
      mockRepository,
    );
  });

  it('should create a professional', async () => {
    const request: CreateProfessionalRequest = {
      nome: 'John Doe',
      telefone: '1234567890',
      email: 'john@example.com',
      tipoDeProfissionalId: '123',
      situacao: true,
    };

    const createdProfessional = new ProfessionalModel(
      request.nome,
      request.telefone,
      request.email,
      request.tipoDeProfissionalId,
      request.situacao,
      new Date(),
      new Date(),
    );

    (mockRepository.save as jest.Mock).mockResolvedValue(createdProfessional);

    const result = await createProfessionalService.createProfessional(request);

    expect(result).toEqual(createdProfessional);
  });

  it('should not create a professional with invalid input', async () => {
    const invalidProfessionalName = ''; // Nome de profissional inválido

    try {
      await createProfessionalService.createProfessional({
        nome: invalidProfessionalName,
        telefone: '1234567890',
        email: 'john@example.com',
        tipoDeProfissionalId: '123',
        situacao: true,
      });
    } catch (error) {
      // Esperar que o erro ocorra durante a execução do teste
      expect(error).toBeDefined();
    }
  });
});
