import { Repository } from 'typeorm';
import ProfessionalModel from '../../../../../src/modules/professional/models/professional.models';
import { Professional } from '../../../../../src/modules/professional/entities/professional.entity';
import MockDeleteProfessionalService from './MockDeleteProfessionalService';

describe('DeleteProfessionalService', () => {
  it('softDeleteProfessional should soft delete a professional', async () => {
    const mockRepository: Repository<Professional> = {
      findOne: jest.fn(),
      softRemove: jest.fn(),
    } as any;

    const deleteProfessionalService = new MockDeleteProfessionalService(
      mockRepository,
    );

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

    const softDeleteResult = {
      raw: [1],
    };

    (mockRepository.softRemove as jest.Mock).mockResolvedValue(
      softDeleteResult,
    );

    const result = await deleteProfessionalService.softDeleteProfessional(
      mockProfessional.id,
    );

    expect(result).toBe(true);
  });

  it('softDeleteProfessional should return false for non-existent professional', async () => {
    const mockRepository: Repository<Professional> = {
      findOne: jest.fn(),
      softRemove: jest.fn(),
    } as any;

    const deleteProfessionalService = new MockDeleteProfessionalService(
      mockRepository,
    );

    const nonExistentProfessionalId = 'non-existent-uuid';

    (mockRepository.findOne as jest.Mock).mockResolvedValue(null);

    const result = await deleteProfessionalService.softDeleteProfessional(
      nonExistentProfessionalId,
    );

    expect(result).toBe(false);
  });
});
