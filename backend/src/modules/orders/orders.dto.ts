import { IsNotEmpty, IsNumber, IsArray, IsDate } from 'class-validator';

interface ProductsByOrder {
  _id: string;
  name: string;
}

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsArray()
  products: string[];

  @IsNotEmpty()
  @IsNumber()
  total: number;
}

export interface OrderDTO {
  _id: string;
  date: Date;
  total: number;
  products: ProductsByOrder[];
}
