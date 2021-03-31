import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

class BaseEntitiy {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn()
  created_at: Date;
}

export { BaseEntitiy };
