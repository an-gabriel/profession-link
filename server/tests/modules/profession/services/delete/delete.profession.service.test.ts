import { Connection, Repository } from 'typeorm';
import { Profession } from '../../../../../src/modules/profession/entities/profession.entity';

import ProfessionModel from '../../../../../src/modules/profession/models/profession.models';
import MockDeleteProfessionService from './MockDeleteProfessionService';

describe('DeleteProfessionService', () => {
  it('softDeleteProfession should soft delete a profession', async () => {
    const mockRepository: Repository<Profession> = {
      findOne: jest.fn(),
      softRemove: jest.fn(),
    } as any;

    const deleteProfessionService = new MockDeleteProfessionService(
      mockRepository,
    );

    // Criar uma instância da ProfessionModel
    const mockProfession = new ProfessionModel(
      'Test Profession',
      true,
      new Date(),
      new Date(),
    );

    (mockRepository.findOne as jest.Mock).mockResolvedValue(mockProfession);

    const softDeleteResult = {
      raw: [1], // O número de linhas afetadas
    };

    (mockRepository.softRemove as jest.Mock).mockResolvedValue(
      softDeleteResult,
    );

    const result = await deleteProfessionService.softDeleteProfession(
      mockProfession.id,
    );

    expect(result).toBe(true);
  });

  it('softDeleteProfession should return false for non-existent profession', async () => {
    const mockRepository: Repository<Profession> = {
      findOne: jest.fn(),
      softRemove: jest.fn(),
    } as any;

    const deleteProfessionService = new MockDeleteProfessionService(
      mockRepository,
    );

    const nonExistentProfessionId = 'non-existent-uuid'; // Substitua pelo UUID gerado pela ProfessionModel

    (mockRepository.findOne as jest.Mock).mockResolvedValue(null); // Simulando profissão inexistente

    const result = await deleteProfessionService.softDeleteProfession(
      nonExistentProfessionId,
    );

    expect(result).toBe(false);
  });
});
