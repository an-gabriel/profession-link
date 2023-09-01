import { Repository } from 'typeorm';
import MockCreateProfessionService from './MockCreateProfessionService';
import ProfessionModel from '../../../../../src/modules/profession/models/profession.models';
import { Profession } from '../../../../../src/modules/profession/entities/profession.entity';

describe('CreateProfessionService', () => {
  let mockRepository: Repository<Profession>;
  let createProfessionService: MockCreateProfessionService;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
    } as any;

    createProfessionService = new MockCreateProfessionService(mockRepository);
  });

  it('createProfession should create a profession', async () => {
    const professionName = 'Test Profession';

    const mockProfession = new ProfessionModel(
      professionName,
      true,
      new Date(),
      new Date(),
    );

    (mockRepository.save as jest.Mock).mockResolvedValue(mockProfession);

    const result = await createProfessionService.createProfession({
      descricao: professionName,
      situacao: true,
    });

    expect(result).toEqual(mockProfession);
  });

  it('createProfession should not create a profession with invalid input', async () => {
    const invalidProfessionName = '';

    try {
      await createProfessionService.createProfession({
        descricao: invalidProfessionName,
        situacao: true,
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
