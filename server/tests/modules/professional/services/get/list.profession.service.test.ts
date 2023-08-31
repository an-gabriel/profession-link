import { Repository } from 'typeorm';
import ProfessionalModel from '../../../../../src/modules/professional/models/professional.models';
import { Professional } from '../../../../../src/modules/professional/entities/professional.entity';
import MockListProfessionalService from './MockListProfessionalService';

describe('ListProfessionalService', () => {
  it('getProfessionalById should return a professional', async () => {
    const mockRepository: Repository<Professional> = {
      findOne: jest.fn(),
      find: jest.fn(),
    } as any;

    const listProfessionalService = new MockListProfessionalService(mockRepository);

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

    const result = await listProfessionalService.getProfessionalById(1);

    expect(result).toEqual(mockProfessional);
  });

  it('getAllProfessionals should return an array of professionals', async () => {
    const mockRepository: Repository<Professional> = {
      findOne: jest.fn(),
      find: jest.fn(),
    } as any;

    const listProfessionalService = new MockListProfessionalService(mockRepository);

    const mockProfessionals = [
      new ProfessionalModel('Professional 1', '1234567890', 'test1@example.com', '123', true, new Date(), new Date()),
      new ProfessionalModel('Professional 2', '9876543210', 'test2@example.com', '456', true, new Date(), new Date()),
    ];

    (mockRepository.find as jest.Mock).mockResolvedValue(mockProfessionals);

    const result = await listProfessionalService.getAllProfessionals();

    expect(result).toEqual(mockProfessionals);
  });
});
