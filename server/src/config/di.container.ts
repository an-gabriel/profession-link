import { Container } from 'inversify';

// import { HealthCheckController } from './modules/health-check/controller/health-check.controller';

export class DiContainer {
  private static container: Container;

  public static getContainer(): Container {
    if (!this.container) {
      this.container = new Container();
      this.registerControllers();
    }
    return this.container;
  }

  private static registerControllers(): void {
    //  this.container.bind<HealthCheckController>(HealthCheckController).toSelf();
  }
}
