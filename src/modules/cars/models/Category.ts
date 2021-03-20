import { BaseEntitiy } from './BaseEntity';

class Category extends BaseEntitiy {
  name: string;
  description: string;

  constructor() {
    super();
  }
}

export { Category };
