import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';

import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 文件上传
  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  // 上传拦截器 file 为前端上传 key
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile('file') file) {
    console.log(file);
    return file;

    //return { url: `http://localhost:3009/uploads/${file.filename}` };
    // return {
    //   ...file,
    //   name: file.url,
    // };
  }
}
