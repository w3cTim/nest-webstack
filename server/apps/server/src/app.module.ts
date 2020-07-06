import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommomModule } from 'libs/commom/src';

@Module({
  imports: [CommomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
