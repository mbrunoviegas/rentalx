interface IAuth {
  generateToken(props: string): string;
  verify(token: string): void;
}

export { IAuth };
