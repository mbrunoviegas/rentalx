interface IEncrypt {
  encrypt(prop: string): Promise<string>;
}

export { IEncrypt };
