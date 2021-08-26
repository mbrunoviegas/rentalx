import '@shared/core/container';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import path from 'path';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import createConnection from '@shared/infra/database';
import routes from '@shared/infra/http/routes';
import { ExceptionValidation } from '../../core/errors/ExceptionValidation';
import rateLimiter from './middlewares/RateLimiter';

createConnection();
const app = express();

Sentry.init({
  dsn: 'https://05a52653bfa2432ebf65aaafe5380f39@o976391.ingest.sentry.io/5932741',
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],

  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(rateLimiter);

app.use(express.json());

const swaggerDocumentPath = path.resolve(__dirname, '..', '..', '..', './swagger.yml');
app.use('/api', swaggerUi.serve, swaggerUi.setup(YAML.load(swaggerDocumentPath)));

app.use(cors());
app.use(routes);

app.use(Sentry.Handlers.errorHandler());

const exceptionValidation = new ExceptionValidation();
app.use(exceptionValidation.catchError);

export { app };
