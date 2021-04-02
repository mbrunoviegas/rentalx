import express, { Express, Router } from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import routes from './routes';
import './shared/container';
import './shared/database';

class App {
  private express: Express;
  private routes: Router;

  constructor() {
    this.express = express();
    this.express.use(express.json());
    const swaggerDocumentPath = path.resolve(__dirname, './swagger.yaml');
    this.express.use('/api', swaggerUi.serve, swaggerUi.setup(YAML.load(swaggerDocumentPath)));
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
