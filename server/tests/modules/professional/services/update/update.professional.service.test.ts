import { Repository } from 'typeorm';
import { Professional } from '../../../../../src/modules/professional/entities/professional.entity';
import MockUpdateProfessionalService from './MockUpdateProfessionalService';
import ProfessionalModel from '../../../../../src/modules/professional/models/professional.models';

describe('UpdateProfessionalService', () => {
  let mockRepository: Repository<Professional>;
  let updateProfessionalService: MockUpdateProfessionalService;

  beforeEach(() => {
    mockRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
    } as any;

    updateProfessionalService = new MockUpdateProfessionalService(mockRepository);
  });

  it('should update nome', async () => {
    const newNome = 'New Nome';

    const mockProfessional = new ProfessionalModel(
      'Test Professional',
      '1234567890',
      'test@example.com',
      '123',
      true,
      new Date(),
      new Date(),
    );

    (mockRepository.findOne as jest.Mock).mockResolvedValue(mockProfessional);

    const updatedProfessional = new ProfessionalModel(
      newNome,
      mockProfessional.telefone,
      mockProfessional.email,
      mockProfessional.tipoDeProfissionalId,
      mockProfessional.situacao,
      new Date(),
      new Date(),
    );

    (mockRepository.save as jest.Mock).mockResolvedValue(updatedProfessional);

    const result = await updateProfessionalService.updateProfessional(
      mockProfessional.id,
      { nome: newNome },
    );

    expect(result).toEqual(updatedProfessional);
  });

  it('should deactivate situacao', async () => {
    const newNome = 'Test Professional';
    const deactivatedSituacao = false;

    const mockProfessional = new ProfessionalModel(
      'Test Professional',
      '1234567890',
      'test@example.com',
      '123',
      true,
      new Date(),
      new Date(),
    );

    (mockRepository.findOne as jest.Mock).mockResolvedValue(mockProfessional);

    const updatedProfessional = new ProfessionalModel(
      newNome,
      mockProfessional.telefone,
      mockProfessional.email,
      mockProfessional.tipoDeProfissionalId,
      deactivatedSituacao,
      new Date(),
      new Date(),
    );

    (mockRepository.save as jest.Mock).mockResolvedValue(updatedProfessional);

    const result = await updateProfessionalService.updateProfessional(
      mockProfessional.id,
      { situacao: deactivatedSituacao },
    );

    expect(result).toEqual(updatedProfessional);
  });

  it('should return undefined for non-existent professional', async () => {
    const nonExistentProfessionalId = 'non-existent-uuid';
    const newNome = 'New Nome';

    (mockRepository.findOne as jest.Mock).mockResolvedValue(null);

    const result = await updateProfessionalService.updateProfessional(
      nonExistentProfessionalId,
      { nome: newNome },
    );

    expect(result).toBeUndefined();
  });
});
