import express, {
  Express, Router,
} from 'express';
import 'express-async-errors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import routes from '@shared/infra/http/routes';
import '@shared/core/container';
import '@shared/infra/database';
import { ExceptionValidation } from '../../core/errors/ExceptionValidation';

class App {
  private express: Express;
  private routes: Router;

  constructor() {
    this.express = express();
    this.express.use(express.json());
    this.setupOpenApi();
    this.getRoutes();
    this.setupExceptionHandler();
  }

  private setupExceptionHandler() {
    const exceptionValidation = new ExceptionValidation();
    this.express.use(exceptionValidation.catchError);
  }

  private setupOpenApi() {
    const swaggerDocumentPath = path.resolve(__dirname, '..', '..', '..', './swagger.yml');
    this.express.use('/api', swaggerUi.serve, swaggerUi.setup(YAML.load(swaggerDocumentPath)));
  }

  private getRoutes() {
    this.routes = routes;
    this.express.use(this.routes);
  }

  get app(): Express {
    return this.express;
  }
}

export default new App().app;
