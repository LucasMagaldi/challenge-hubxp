import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Put,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CreateCategoryDTO } from './categories.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() body: CreateCategoryDTO) {
    try {
      return await this.categoryService.create(body);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while opering the create category.',
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.categoryService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while opering the find categories',
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const category = await this.categoryService.findOne(id);
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not founded.`);
      }
      return category;
    } catch (error) {
      throw new BadRequestException('Invalid ID');
    }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: Partial<CreateCategoryDTO>,
  ) {
    try {
      const updated = await this.categoryService.update(id, updateCategoryDto);
      if (!updated) {
        throw new NotFoundException(`Category with ID ${id} not founded.`);
      }
      return updated;
    } catch (error) {
      throw new BadRequestException('Error while opering the update');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deleted = await this.categoryService.remove(id);
      if (!deleted) {
        throw new NotFoundException(`Category with ID ${id} not foundded`);
      }
      return { message: 'Category deleted successfully' };
    } catch (error) {
      throw new BadRequestException('Error while opering the delete');
    }
  }
}
