import { Repository } from 'typeorm';
import { CreateProfessionalService } from '../../../../../src/modules/professional/services/create/create.professional.service';
import { CreateProfessionalRequest } from '../../../../../src/modules/professional/interfaces/professional.interface';
import MockCreateProfessionalService from './MockCreateProfessionalService';
import { Professional } from '../../../../../src/modules/professional/entities/professional.entity';
import { Profession } from '../../../../../src/modules/profession/entities/profession.entity';
import { CreateProfessionService } from '../../../../../src/modules/profession/services/create/create.profession.service';
import MockCreateProfessionService from '../../../profession/services/create/MockCreateProfessionService';

describe('CreateProfessionalService', () => {
  let createProfessionalService: CreateProfessionalService;
  let createProfessionService: CreateProfessionService;
  let mockProfessionalRepository: Repository<Professional>;
  let mockProfessionRepository: Repository<Profession>;

  beforeEach(() => {
    mockProfessionalRepository = {
      save: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
    } as any;

    mockProfessionRepository = {
      save: jest.fn(),
      findOne: jest.fn(),
    } as any;

    createProfessionalService = new MockCreateProfessionalService(
      mockProfessionalRepository,
      mockProfessionRepository,
    );
  });

  it('should create a professional', async () => {
    const request: CreateProfessionalRequest = {
      nome: 'John Doe',
      telefone: '1234567890',
      email: 'john@example.com',
      tipoDeProfissional: '123',
      situacao: true,
    };

    const createdProfessional = new Professional();
    createdProfessional.nome = request.nome;
    createdProfessional.telefone = request.telefone;
    createdProfessional.email = request.email;
    createdProfessional.situacao = request.situacao;
    createdProfessional.tipoDeProfissional = request.tipoDeProfissional;
    createdProfessional.createdAt = new Date();
    createdProfessional.updatedAt = new Date();

    (mockProfessionRepository.findOne as jest.Mock).mockResolvedValue({
      id: '123',
      name: 'Existing Profession',
    });
    (mockProfessionalRepository.create as jest.Mock).mockResolvedValue(
      createdProfessional,
    );
    (mockProfessionalRepository.findOne as jest.Mock).mockResolvedValue(null);
    (mockProfessionalRepository.save as jest.Mock).mockResolvedValue(
      createdProfessional,
    );

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
        tipoDeProfissional: '123',
        situacao: true,
      });
    } catch (error) {
      // Esperar que o erro ocorra durante a execução do teste
      expect(error).toBeDefined();
    }
  });
});
