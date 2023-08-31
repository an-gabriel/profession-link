import { Container } from 'inversify';
import { ProfessionController } from '../../../modules/profession/controllers/profession.controller';
import { ProfessionalController } from '../../../modules/professional/controllers/professional.controller';


export async function bindControllers(container: Container) {
  container.bind<ProfessionController>(ProfessionController).toSelf();
  container.bind<ProfessionalController>(ProfessionalController).toSelf();
  // Adicione outras vinculações de controladores aqui
}
