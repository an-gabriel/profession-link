import { Container } from 'inversify';

// bind dos controllers
import { bindControllers } from '../modules/inversify-config/controllers/inversify.controllers.module';
// bind dos services
import { bindServices } from '../modules/inversify-config/services/inversify.services.module';

export class DiContainer {
  private static container: Container;

  public static getContainer(): Container {
    if (!this.container) {
      this.container = new Container();
      bindControllers(this.container);
      bindServices(this.container);
    }
    return this.container;
  }
}
