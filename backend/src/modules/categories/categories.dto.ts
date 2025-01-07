import { IsNotEmpty, IsString } from 'class-validator';

export class createCategoryDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export interface CategoryDTO {
  _id: string;
  name: string;
}
