import { Specification } from '@shared/infra/database/typeorm/entities/Specification';

export interface ICreateCarRequestDTO {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  specifications?: Specification[],
}
