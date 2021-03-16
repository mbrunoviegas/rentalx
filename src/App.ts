import express, { Express, Router } from 'express';
import { Routes } from './Routes';

class App {
  private express: Express;
  private routes: Router;

  constructor() {
    this.express = express();
    this.express.use(express.json());
    this.getRoutes();
  }

  private getRoutes() {
    this.routes = new Routes().getRoutes;
    this.express.use(this.routes);
  }

  get getExpress(): Express {
    return this.express;
  }
}

export default new App().getExpress;
