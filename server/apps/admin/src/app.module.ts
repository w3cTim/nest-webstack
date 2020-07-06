import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '@libs/db';
import { UsersModule } from './users/users.module';
import { WebstackModule } from './webstack/webstack.module';
import { CategoryModule } from './category/category.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    // 上传文件
    MulterModule.register({
      dest: 'uploads',
    }),
    DbModule,
    UsersModule,
    WebstackModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
