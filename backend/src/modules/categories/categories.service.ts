import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Category, CategoryDocument } from './categories.schema';
import { CreateCategoryDTO, CategoryDTO } from './categories.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDTO): Promise<CategoryDTO> {
    try {
      const category = new this.categoryModel(createCategoryDto);
      const savedCategory = await category.save();
      return this.toDTO(savedCategory);
    } catch (error) {
      throw new InternalServerErrorException('Error while creating category.');
    }
  }

  async findAll(): Promise<CategoryDTO[]> {
    try {
      const categories = await this.categoryModel.find().exec();
      return categories.map((category) => this.toDTO(category));
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while fetching categories.',
      );
    }
  }

  async findOne(id: string): Promise<CategoryDTO> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID.');
    }

    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException('Category not found.');
    }

    return this.toDTO(category);
  }

  async update(
    id: string,
    updateCategoryDto: Partial<CreateCategoryDTO>,
  ): Promise<CategoryDTO> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID.');
    }

    try {
      const category = await this.categoryModel.findByIdAndUpdate(
        id,
        updateCategoryDto,
        { new: true },
      );

      if (!category) {
        throw new NotFoundException('Category not found.');
      }

      return this.toDTO(category);
    } catch (error) {
      throw new InternalServerErrorException('Error while updating category.');
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID.');
    }

    const result = await this.categoryModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Category not found.');
    }

    return { message: 'Category successfully deleted.' };
  }

  private toDTO(category: CategoryDocument): CategoryDTO {
    return {
      _id: category._id.toString(),
      name: category.name,
    };
  }
}
