import { sign } from 'jsonwebtoken';
import { IAuth } from '../interfaces/IAuth';

class AuthProvider implements IAuth {
  generateToken(props: string): string {
    const accessToken = sign({}, '8c3e8ac1e97287175b3af8341c17a104', { subject: props, expiresIn: '1d' });
    return accessToken;
  }
}

export { AuthProvider };
