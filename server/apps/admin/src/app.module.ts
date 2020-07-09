import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '@libs/db';
import { UsersModule } from './users/users.module';
import { WebstackModule } from './webstack/webstack.module';
import { CategoryModule } from './category/category.module';
import { MulterModule } from '@nestjs/platform-express';
import { CommomModule } from 'libs/commom/src';
import { AuthModule } from './auth/auth.module';

const MAO = require('multer-aliyun-oss');

@Module({
  imports: [
    // 先加载 CommomModule
    CommomModule,
    // 上传文件
    MulterModule.registerAsync({
      useFactory() {
        return {
          storage: MAO({
            config: {
              region: process.env.OSS_REGION,
              accessKeyId: process.env.OSS_ACCESS_KEY_ID,
              accessKeySecret: process.env.OSS_ACCESS_KEY_SECERT,
              bucket: process.env.OSS_BUCKET,
            },
          }),
        };
      },
    }),

    // MulterModule.register({
    //   //dest: 'uploads',
    //   storage: MAO({
    //     config: {
    //       region: process.env.OSS_REGION,
    //       accessKeyId: process.env.OSS_ACCESS_KEY_ID,
    //       accessKeySecret: process.env.OSS_ACCESS_KEY_SECERT,
    //       bucket:process.env.OSS_BUCKET,
    //     },
    //   }),
    // }),
    // DbModule,

    UsersModule,
    WebstackModule,
    CategoryModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
