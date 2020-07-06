import { Module } from '@nestjs/common';
import { WebstackController } from './webstack.controller';

@Module({
  controllers: [WebstackController]
})
export class WebstackModule {}
