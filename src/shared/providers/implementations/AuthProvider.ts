import { sign, verify } from 'jsonwebtoken';

class AuthProvider {
  static generateToken(props: string): string {
    const accessToken = sign({}, '8c3e8ac1e97287175b3af8341c17a104', { subject: props, expiresIn: '1d' });
    return accessToken;
  }

  static verify(token: string): unknown | string {
    return verify(token, '8c3e8ac1e97287175b3af8341c17a104');
  }
}

export { AuthProvider };
