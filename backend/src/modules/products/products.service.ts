import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.schema';
import { CreateProductDTO, ProductDTO } from './products.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
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
  ): Promise<Product> {
    const product = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      {
        new: true,
      },
    );
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Product not found');
  }
}
