import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  IsMongoId,
  ArrayUnique,
  Min,
} from 'class-validator';

interface CategoriesByProduct {
  _id: string;
  name: string;
}

export class CreateProductDTO {
  @IsNotEmpty({ message: 'The product name is required.' })
  @IsString({ message: 'The product name must be a string.' })
  name: string;

  @IsOptional()
  @IsString({ message: 'The description must be a string.' })
  description: string;

  @IsNotEmpty({ message: 'The price is required.' })
  @IsNumber({}, { message: 'The price must be a number.' })
  @Min(0, { message: 'The price cannot be negative.' })
  price: number;

  @IsOptional()
  @IsArray({ message: 'Categories must be an array.' })
  @ArrayUnique({ message: 'Categories cannot contain duplicate IDs.' })
  @IsMongoId({ each: true, message: 'Each category must be a valid ID.' })
  categories?: string[];

  @IsOptional()
  @IsString({ message: 'The image URL must be a string.' })
  imageUrl?: string;
}

export interface ProductDTO {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categories: CategoriesByProduct[];
}
