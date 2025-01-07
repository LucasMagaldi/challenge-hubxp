import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './categories.schema';
import { createCategoryDTO } from './categories.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(createProductDto: createCategoryDTO): Promise<Category> {
    const category = new this.categoryModel(createProductDto);
    return category.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(
    id: string,
    updateCategoryDto: Partial<createCategoryDTO>,
  ): Promise<Category> {
    const category = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
      {
        new: true,
      },
    );
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async remove(id: string): Promise<void> {
    const result = await this.categoryModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Category not found');
  }
}
