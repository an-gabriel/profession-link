import 'reflect-metadata';
import { Container } from 'inversify';
import { ListProfessionService } from '../../../modules/profession/services/get/list.profession.service';

import { UpdateProfessionService } from '../../../modules/profession/services/update/update.profession.service';
import { DeleteProfessionService } from '../../../modules/profession/services/delete/delete.profession.service';
import { CreateProfessionService } from '../../../modules/profession/services/create/create.profession.service';

export async function bindServices(container: Container) {
  container.bind<ListProfessionService>(ListProfessionService).toSelf();
  container.bind<UpdateProfessionService>(UpdateProfessionService).toSelf();
  container.bind<DeleteProfessionService>(DeleteProfessionService).toSelf();
  container.bind<CreateProfessionService>(CreateProfessionService).toSelf();
}
