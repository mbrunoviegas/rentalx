import { Router } from 'express';

export class BaseController {
  protected routes: Router;
  constructor() {
    this.routes = Router();
  }

  get controllerRoutes(): Router {
    return this.routes;
  }
}
