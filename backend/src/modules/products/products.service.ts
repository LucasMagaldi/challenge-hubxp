import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.schema';
import { CreateProductDTO, ProductDTO } from './products.dto';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly s3Service: S3Service,
  ) {}

  async create(createProductDto: CreateProductDTO): Promise<Product> {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  async findAll(): Promise<ProductDTO[]> {
    const products = await this.productModel
      .find()
      .populate('categories', 'name')
      .exec();
    return products.map((product) => ({
      _id: product._id.toString(),
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price,
      categories: product.categories.map((category: any) => ({
        _id: category._id.toString(),
        name: category.name,
      })),
    }));
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel
      .findById(id)
      .populate('categories', 'name')
      .exec();
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(
    id: string,
    updateProductDto: Partial<CreateProductDTO>,
    file?: Express.Multer.File,
  ): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('Product not found');

    Object.assign(product, updateProductDto);
    console.log('Before S3 Service');
    if (file) {
      const imageUrl = await this.s3Service.uploadFile(file);
      product.imageUrl = imageUrl;
    }

    return product.save();
  }

  async remove(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Product not found');
  }
}
