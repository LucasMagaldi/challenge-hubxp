import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty({ message: 'Category name is required' })
  name: string;
}

export interface CategoryDTO {
  _id: string;
  name: string;
}
