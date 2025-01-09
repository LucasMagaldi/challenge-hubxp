import { Module } from '@nestjs/common';
import { CategoryModule } from './modules/categories/categories.module';
import { DatabaseModule } from './database/mongoose.module';
import { ProductModule } from './modules/products/products.module';
import { OrderModule } from './modules/orders/orders.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { S3Module } from './modules/s3/s3.module';

@Module({
  imports: [
    DatabaseModule,
    CategoryModule,
    ProductModule,
    OrderModule,
    DashboardModule,
    S3Module,
  ],
})
export class AppModule {}
