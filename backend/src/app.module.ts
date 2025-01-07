import { Module } from '@nestjs/common';
import { CategoryModule } from './modules/categories/categories.module';
import { DatabaseModule } from './database/mongoose.module';

@Module({
  imports: [DatabaseModule, CategoryModule],
})
export class AppModule {}
