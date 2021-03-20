import { v4 as uuidV4 } from 'uuid';

class BaseEntitiy {
  id: string;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }

    this.created_at = new Date();
  }
}

export { BaseEntitiy };
