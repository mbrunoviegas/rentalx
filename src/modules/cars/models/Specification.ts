import { BaseEntitiy } from './BaseEntity';

class Specification extends BaseEntitiy {
  name: string;
  description: string;

  constructor() {
    super();
  }
}

export { Specification };
