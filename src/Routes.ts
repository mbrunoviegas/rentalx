import { Router } from 'express';
import * as Controllers from './controllers';

export class Routes {
  private routes: Router;

  constructor() {
    this.routes = Router();
    this.createRoutes();
  }

  private createRoutes() {
    Object.values(Controllers).forEach((Controller) => {
      const routeName = '/'.concat(Controller.name.toLocaleLowerCase().replace('controller', ''));
      this.routes.use(routeName, new Controller().controllerRoutes);
    });
  }

  get getRoutes(): Router {
    return this.routes;
  }
}
