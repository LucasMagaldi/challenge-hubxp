import { Module } from '@nestjs/common';
import { CategoryModule } from './modules/categories/categories.module';
import { DatabaseModule } from './database/mongoose.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
