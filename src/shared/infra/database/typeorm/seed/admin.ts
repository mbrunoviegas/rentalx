import { CryptProvider } from '@shared/core/providers/implementations/CryptProvider';
import getConnection from '@shared/infra/database';

const create = async () => {
  const connection = await getConnection('localhost');
  const cryptProvider = new CryptProvider();
  const password = await cryptProvider.encrypt('admin');

  await connection.query(`INSERT INTO USERS(name, username, password, email, driver_license, "isAdmin")
    VALUES('admin', 'admin', '${password}', 'admin@rentx.com', 'XXXXXXX', true)
  `);

  connection.close();
};

create().then(() =>
  console.log('Admin was created'));
