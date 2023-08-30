import { Repository } from 'typeorm';
import MockCreateProfessionService from './MockCreateProfessionService';
import ProfessionModel from '../../../../../src/modules/profession/models/profession.models';
import { Profession } from '../../../../../src/modules/profession/entities/profession.entity';

describe('CreateProfessionService', () => {
  it('createProfession should create a profession', async () => {
    const mockRepository: Repository<Profession> = {
      save: jest.fn(),
    } as any;

    const createProfessionService = new MockCreateProfessionService(
      mockRepository,
    );

    const professionName = 'Test Profession';

    const mockProfession = new ProfessionModel(
      professionName,
      true,
      new Date(),
      new Date(),
    );

    (mockRepository.save as jest.Mock).mockResolvedValue(mockProfession);
    const result =
      await createProfessionService.createProfession(professionName);

    expect(result).toEqual(mockProfession); // Comparar com o mockProfession
  });

  it('createProfession should not create a profession with invalid input', async () => {
    const mockRepository: Repository<Profession> = {
      save: jest.fn(),
    } as any;

    const createProfessionService = new MockCreateProfessionService(
      mockRepository,
    );

    const invalidProfessionName = ''; // Nome de profissão inválido

    try {
      await createProfessionService.createProfession(invalidProfessionName);
    } catch (error) {
      // Esperar que o erro ocorra durante a execução do teste
      expect(error).toBeDefined();
    }
  });
});
