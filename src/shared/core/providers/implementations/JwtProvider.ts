import { sign, verify } from 'jsonwebtoken';

class JwtProvider {
  static generateToken(props: string, secret: string, expiresIn: string, payload = {}): string {
    const accessToken = sign({ ...payload }, secret, { subject: props, expiresIn });
    return accessToken;
  }

  static verify(token: string, secret: string): unknown | string {
    return verify(token, secret);
  }
}

export { JwtProvider };
