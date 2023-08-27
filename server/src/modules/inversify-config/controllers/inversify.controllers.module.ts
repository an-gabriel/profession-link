import { Container } from 'inversify';
import { ProfessionController } from '../../profession/controllers/profession.controller';

export function bindControllers(container: Container) {
  container.bind<ProfessionController>(ProfessionController).toSelf();
  // Adicione outras vinculações de controladores aqui
}
