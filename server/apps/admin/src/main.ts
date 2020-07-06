import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // 存储数据必须指定基于具体的框架
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 允许跨域
  app.enableCors();
  // 静态托管
  app.useStaticAssets('uploads', {
    prefix: '/uploads',
  });

  const options = new DocumentBuilder()
    .setTitle('WebStack-后台管理API')
    .setDescription('供后台管理界面调用的服务端API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3009);
}
bootstrap();
