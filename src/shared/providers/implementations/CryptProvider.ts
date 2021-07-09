import { compare, hash } from 'bcryptjs';
import { ICrypt } from '@shared/providers/interfaces/ICrypt';

class CryptProvider implements ICrypt {
  async encrypt(prop: string): Promise<string> {
    const encrypted = await hash(prop, 8);
    return encrypted;
  }

  async compare(prop: string, encryptedProp: string): Promise<boolean> {
    const isEqual = await compare(prop, encryptedProp);
    return isEqual;
  }
}

export { CryptProvider };
