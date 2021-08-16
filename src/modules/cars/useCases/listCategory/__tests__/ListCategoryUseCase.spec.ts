import request from 'supertest';
import { Connection } from 'typeorm';
import { CryptProvider } from '@shared/core/providers/implementations/CryptProvider';
import { ICrypt } from '@shared/core/providers/interfaces/ICrypt';
import createConnection from '@shared/infra/database/index';
import { app } from '@shared/infra/http/app';

describe('List Category Use Case', () => {
  let connection: Connection;
  let cryptProvider: ICrypt;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    cryptProvider = new CryptProvider();
    const password = await cryptProvider.encrypt('admin');

    await connection.query(`INSERT INTO USERS(name, username, password, email, driver_license, "isAdmin")
    VALUES('admin', 'admin', '${password}', 'admin@rentx.com', 'XXXXXXX', true)
  `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to list all categories', async () => {
    const responseToken = await request(app)
      .post('/auth')
      .send({
        email: 'admin@rentx.com',
        password: 'admin',
      });

    const { refresh_token } = responseToken.body;
    await request(app)
      .post('/categories')
      .set({
        Authorization: `Bearer ${refresh_token}`,
      })
      .send({
        name: 'Test',
        description: 'Test',
      });

    const response = await request(app)
      .get('/categories')
      .send();

    expect(response.body[0]).toHaveProperty('id');
  });
});
