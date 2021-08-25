interface IAuth {
  generateToken(props: string, secret: string, expiresIn: string, payload?: any): string;
  verify(token: string, secret: string): void;
}

export { IAuth };
