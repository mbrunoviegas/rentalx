interface IAuth {
  generateToken(props: string): string;
}

export { IAuth };
