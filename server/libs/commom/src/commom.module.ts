import { Module, Global } from '@nestjs/common';
import { CommomService } from './commom.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from '@libs/db';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  // ConfigModule 在任意位置可用
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: process.env.JWT_SECRET,
        };
      },
    }),
    DbModule,
  ],
  providers: [CommomService],
  exports: [CommomService, JwtModule],
})
export class CommomModule {}
