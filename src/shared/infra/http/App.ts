import express, {
  Express, Router,
} from 'express';
import 'express-async-errors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import createConnection from '@shared/infra/database';
import routes from '@shared/infra/http/routes';
import { ExceptionValidation } from '../../core/errors/ExceptionValidation';
import '@shared/core/container';

createConnection();
const app = express();

app.use(express.json());

const swaggerDocumentPath = path.resolve(__dirname, '..', '..', '..', './swagger.yml');
app.use('/api', swaggerUi.serve, swaggerUi.setup(YAML.load(swaggerDocumentPath)));

app.use(routes);

const exceptionValidation = new ExceptionValidation();
app.use(exceptionValidation.catchError);

export { app };

// class App {
//   private express: Express;
//   private routes: Router;

//   constructor() {
//     this.express = express();
//     this.express.use(express.json());

//     createConnection();

//     this.setupOpenApi();
//     this.getRoutes();
//     this.setupExceptionHandler();
//   }

//   private setupExceptionHandler() {
//     const exceptionValidation = new ExceptionValidation();
//     this.express.use(exceptionValidation.catchError);
//   }

//   private setupOpenApi() {
//     const swaggerDocumentPath = path.resolve(__dirname, '..', '..', '..', './swagger.yml');
//     this.express.use('/api', swaggerUi.serve, swaggerUi.setup(YAML.load(swaggerDocumentPath)));
//   }

//   private getRoutes() {
//     this.routes = routes;
//     this.express.use(this.routes);
//   }

//   get app(): Express {
//     return this.express;
//   }
// }

// export default new App().app;
