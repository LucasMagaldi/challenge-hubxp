import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
} from 'class-validator';

interface CategoriesByProduct {
  _id: string;
  name: string;
}

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsArray()
  categories: string[];

  @IsOptional()
  @IsString()
  imageUrl: string;
}

export interface ProductDTO {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categories: CategoriesByProduct[];
}
