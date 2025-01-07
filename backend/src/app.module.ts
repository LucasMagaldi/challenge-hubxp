import { Module } from '@nestjs/common';
import { CategoryModule } from './modules/categories/categories.module';

@Module({
  imports: [CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
