import { Repository } from 'typeorm';
import MockListProfessionService from './MockListProfessionService';
import ProfessionModel from '../../../../../src/modules/profession/models/profession.models';
import { Profession } from '../../../../../src/modules/profession/entities/profession.entity';

describe('ListProfessionService', () => {
  it('getProfessionById should return a profession', async () => {
    const mockRepository: Repository<Profession> = {
      findOne: jest.fn(),
      find: jest.fn(),
    } as any;

    const listProfessionService = new MockListProfessionService(mockRepository);

    const mockProfession = new ProfessionModel(
      'Test Profession',
      true,
      new Date(),
      new Date(),
    );

    (mockRepository.findOne as jest.Mock).mockResolvedValue(mockProfession);

    const result = await listProfessionService.getProfessionById(1);

    expect(result).toEqual(mockProfession);
  });

  it('getAllProfessions should return an array of professions', async () => {
    const mockRepository: Repository<Profession> = {
      findOne: jest.fn(),
      find: jest.fn(),
    } as any;

    const listProfessionService = new MockListProfessionService(mockRepository);

    const mockProfessions = [
      new ProfessionModel('Profession 1', true, new Date(), new Date()),
      new ProfessionModel('Profession 2', true, new Date(), new Date()),
    ];

    (mockRepository.find as jest.Mock).mockResolvedValue(mockProfessions);

    const result = await listProfessionService.getAllProfessions();

    expect(result).toEqual(mockProfessions);
  });
});
