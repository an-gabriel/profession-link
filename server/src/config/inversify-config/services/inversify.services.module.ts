import 'reflect-metadata';
import { Container } from 'inversify';

import { ListProfessionService } from '../../../modules/profession/services/get/list.profession.service';
import { UpdateProfessionService } from '../../../modules/profession/services/update/update.profession.service';
import { DeleteProfessionService } from '../../../modules/profession/services/delete/delete.profession.service';
import { CreateProfessionService } from '../../../modules/profession/services/create/create.profession.service';

import { ListProfessionalService } from '../../../modules/professional/services/get/list.profession.service';
import { UpdateProfessionalService } from '../../../modules/professional/services/update/update.professional.service';
import { DeleteProfessionalService } from '../../../modules/professional/services/delete/delete.professional.service';
import { CreateProfessionalService } from '../../../modules/professional/services/create/create.professional.service';

export async function bindServices(container: Container) {
  // profession
  container.bind<ListProfessionService>(ListProfessionService).toSelf();
  container.bind<UpdateProfessionService>(UpdateProfessionService).toSelf();
  container.bind<DeleteProfessionService>(DeleteProfessionService).toSelf();
  container.bind<CreateProfessionService>(CreateProfessionService).toSelf();
  // professional
  container.bind<ListProfessionalService>(ListProfessionalService).toSelf();
  container.bind<UpdateProfessionalService>(UpdateProfessionalService).toSelf();
  container.bind<DeleteProfessionalService>(DeleteProfessionalService).toSelf();
  container.bind<CreateProfessionalService>(CreateProfessionalService).toSelf();
}
