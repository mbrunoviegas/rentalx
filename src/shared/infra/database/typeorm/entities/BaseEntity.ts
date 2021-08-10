import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn()
  created_at: Date;
}

export { BaseEntity };
