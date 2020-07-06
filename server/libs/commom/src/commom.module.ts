import { Module } from '@nestjs/common';
import { CommomService } from './commom.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from '@libs/db';

@Module({
  // ConfigModule 在任意位置可用
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DbModule,
  ],
  providers: [CommomService],
  exports: [CommomService],
})
export class CommomModule {}
