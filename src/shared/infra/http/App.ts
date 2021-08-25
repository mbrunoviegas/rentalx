import '@shared/core/container';
import express from 'express';
import 'express-async-errors';
import path from 'path';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import createConnection from '@shared/infra/database';
import routes from '@shared/infra/http/routes';
import { ExceptionValidation } from '../../core/errors/ExceptionValidation';

createConnection();
const app = express();

app.use(express.json());

const swaggerDocumentPath = path.resolve(__dirname, '..', '..', '..', './swagger.yml');
app.use('/api', swaggerUi.serve, swaggerUi.setup(YAML.load(swaggerDocumentPath)));

app.use(routes);

const exceptionValidation = new ExceptionValidation();
app.use(exceptionValidation.catchError);

export { app };
