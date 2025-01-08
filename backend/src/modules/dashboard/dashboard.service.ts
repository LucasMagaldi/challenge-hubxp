import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from '../orders/orders.schema';
import { Product, ProductDocument } from '../products/products.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async getSalesMetrics(
    categoryIds?: string[],
    productIds?: string[],
    startDate?: Date,
    endDate?: Date,
  ): Promise<any> {
    const match: any = {};

    // Filtros de Período
    if (startDate || endDate) {
      match.date = {};
      if (startDate) match.date.$gte = startDate;
      if (endDate) match.date.$lte = endDate;
    }

    // Filtros de Produtos
    if (productIds?.length) {
      match.products = { $in: productIds.map((id) => new Types.ObjectId(id)) };
    }

    // Filtros de Categorias
    if (categoryIds?.length) {
      const categoryProducts = await this.productModel
        .find(
          {
            categories: {
              $in: categoryIds.map((id) => new Types.ObjectId(id)),
            },
          },
          '_id',
        )
        .lean()
        .exec();

      const filteredProductIds = categoryProducts.map((product) => product._id);

      if (filteredProductIds.length) {
        match.products = match.products
          ? {
              $in: [...new Set([...match.products.$in, ...filteredProductIds])],
            }
          : { $in: filteredProductIds };
      }
    }

    // Agregação para métricas
    const metrics = await this.orderModel.aggregate([
      { $match: match },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$total' },
          averageOrderValue: { $avg: '$total' },
        },
      },
    ]);

    return (
      metrics[0] || { totalOrders: 0, totalRevenue: 0, averageOrderValue: 0 }
    );
  }
}