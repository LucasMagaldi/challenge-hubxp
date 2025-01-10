import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Product, ProductDocument } from './products.schema';
import { CreateProductDTO, ProductDTO } from './products.dto';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly s3Service: S3Service,
  ) {}

  async create(
    createProductDto: CreateProductDTO,
    file?: Express.Multer.File,
  ): Promise<ProductDTO> {
    try {
      const product = new this.productModel(createProductDto);

      if (file) {
        const imageUrl = await this.s3Service.uploadFile(file);
        product.imageUrl = imageUrl;
      }

      const savedProduct = await product.save();
      return this.toDTO(savedProduct);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while creating the product.',
      );
    }
  }

  async update(
    id: string,
    updateProductDto: Partial<CreateProductDTO>,
    file?: Express.Multer.File,
  ): Promise<ProductDTO> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID.');
    }

    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    try {
      Object.assign(product, updateProductDto);

      if (file) {
        const imageUrl = await this.s3Service.uploadFile(file);
        product.imageUrl = imageUrl;
      }

      const updatedProduct = await product.save();
      return this.toDTO(updatedProduct);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while updating the product.',
      );
    }
  }

  async findAll(): Promise<ProductDTO[]> {
    try {
      const products = await this.productModel
        .find()
        .populate('categories', 'name')
        .exec();

      return products.map((product) => this.toDTO(product));
    } catch (error) {
      throw new InternalServerErrorException('Error while fetching products.');
    }
  }

  async findOne(id: string): Promise<ProductDTO> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID.');
    }

    const product = await this.productModel
      .findById(id)
      .populate('categories', 'name')
      .exec();

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    return this.toDTO(product);
  }

  async remove(id: string): Promise<{ message: string }> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID.');
    }

    const result = await this.productModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Product not found.');
    }

    return { message: 'Product successfully deleted.' };
  }

  private toDTO(product: ProductDocument): ProductDTO {
    return {
      _id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      categories: product.categories.map((category: any) => ({
        _id: category._id.toString(),
        name: category.name,
      })),
    };
  }
}
