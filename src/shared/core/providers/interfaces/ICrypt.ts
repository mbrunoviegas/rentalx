import { ICompare } from './ICompare';
import { IEncrypt } from './IEncrypt';

interface ICrypt extends IEncrypt, ICompare {}

export { ICrypt };
