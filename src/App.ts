import express, { Express, Router } from 'express';
import { AppRoutes } from './app.routes';

class App {
  private express: Express;
  private routes: Router;

  constructor() {
    this.express = express();
    this.express.use(express.json());
    this.getRoutes();
  }

  private getRoutes() {
    this.routes = new AppRoutes().getRoutes;
    this.express.use(this.routes);
  }

  get getExpress(): Express {
    return this.express;
  }
}

export default new App().getExpress;
