import { Module } from '@nestjs/common';
import { CategoryModule } from './modules/categories/categories.module';
import { DatabaseModule } from './database/mongoose.module';
import { ProductModule } from './modules/products/products.module';
import { OrderModule } from './modules/orders/orders.module';

@Module({
  imports: [DatabaseModule, CategoryModule, ProductModule, OrderModule],
})
export class AppModule {}
