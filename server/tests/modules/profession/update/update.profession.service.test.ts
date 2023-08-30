import { Repository } from 'typeorm';

import MockUpdateProfessionService from './MockUpdateProfessionService'; // Importe o mock adequado
import { Profession } from '../../../../src/modules/profession/entities/profession.entity';
import ProfessionModel from '../../../../src/modules/profession/models/profession.models';

describe('UpdateProfessionService', () => {
  let mockRepository: Repository<Profession>;
  let updateProfessionService: MockUpdateProfessionService;

  beforeEach(() => {
    mockRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
    } as any;

    updateProfessionService = new MockUpdateProfessionService(mockRepository);
  });

  it('should update description', async () => {
    const newDescription = 'New Description';

    const mockProfession = new ProfessionModel(
      'Test Profession',
      true,
      new Date(),
      new Date(),
    );

    (mockRepository.findOne as jest.Mock).mockResolvedValue(mockProfession);

    const updatedProfession = new ProfessionModel(
      newDescription,
      true,
      new Date(),
      new Date(),
    );

    (mockRepository.save as jest.Mock).mockResolvedValue(updatedProfession);

    const result = await updateProfessionService.updateProfession(
      mockProfession.id,
      newDescription,
    );

    expect(result).toEqual(updatedProfession);
  });

  it('should deactivate soft delete', async () => {
    const newDescription = 'Test Profession';
    const deactivatedSoftDelete = false;

    const mockProfession = new ProfessionModel(
      'Test Profession',
      true,
      new Date(),
      new Date(),
    );

    (mockRepository.findOne as jest.Mock).mockResolvedValue(mockProfession);

    const updatedProfession = new ProfessionModel(
      newDescription,
      deactivatedSoftDelete,
      new Date(),
      new Date(),
    );

    (mockRepository.save as jest.Mock).mockResolvedValue(updatedProfession);

    const result = await updateProfessionService.updateProfession(
      mockProfession.id,
      newDescription,
    );

    expect(result).toEqual(updatedProfession);
  });

  it('should return undefined for non-existent profession', async () => {
    const nonExistentProfessionId = 'non-existent-uuid'; // Substitua pelo UUID que não existe
    const newDescription = 'New Description';

    (mockRepository.findOne as jest.Mock).mockResolvedValue(null); // Simulando profissão inexistente

    const result = await updateProfessionService.updateProfession(
      nonExistentProfessionId,
      newDescription,
    );

    expect(result).toBeUndefined();
  });
});
