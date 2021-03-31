import express, { Express, Router } from 'express';
import routes from './routes';
import './shared/container';
import './shared/database';

class App {
  private express: Express;
  private routes: Router;

  constructor() {
    this.express = express();
    this.express.use(express.json());
    this.getRoutes();
  }

  private getRoutes() {
    this.routes = routes;
    this.express.use(this.routes);
  }

  get getExpress(): Express {
    return this.express;
  }
}

export default new App().getExpress;
