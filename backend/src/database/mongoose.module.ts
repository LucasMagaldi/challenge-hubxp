import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URL || 'mongodb://root:root@localhost:27017/challenge',
      {
        authSource: 'admin',
      },
    ),
  ],
})
export class DatabaseModule {}
