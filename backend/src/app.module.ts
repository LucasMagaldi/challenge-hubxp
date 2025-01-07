import { Module } from '@nestjs/common';
import { CategoryModule } from './modules/categories/categories.module';
import { DatabaseModule } from './database/mongoose.module';
import { ProductModule } from './modules/products/products.module';

@Module({
  imports: [DatabaseModule, CategoryModule, ProductModule],
})
export class AppModule {}
