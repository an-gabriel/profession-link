import { Container } from 'inversify';
import { ProfessionController } from 'modules/profession/controllers/profession.controller';

export function bindControllers(container: Container) {
  container.bind<ProfessionController>(ProfessionController).toSelf();
  // Adicione outras vinculações de controladores aqui
}
