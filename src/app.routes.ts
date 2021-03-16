import { Router } from 'express';
import * as Routes from './routes';

export class AppRoutes {
  private routes: Router;

  constructor() {
    this.routes = Router();
    this.createRoutes();
  }

  private createRoutes() {
    Object.values(Routes).forEach((route) => {
      this.routes.use(route);
    });
  }

  get getRoutes(): Router {
    return this.routes;
  }
}
