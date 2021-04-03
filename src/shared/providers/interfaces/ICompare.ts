interface ICompare {
  compare(prop: string, encryptedProp: string): Promise<boolean>;
}

export { ICompare };
