import { Container } from 'inversify';
import { ListProfessionService } from 'modules/profession/services/get/list.profession.service';

export function bindServices(container: Container) {
  container.bind<ListProfessionService>(ListProfessionService).toSelf();
  // Adicione outras vinculações de serviços aqui
}
