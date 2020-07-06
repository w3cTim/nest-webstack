import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.model';
import { Category } from './models/category.model';
import { WebStack } from './models/webstack.model';

const models = TypegooseModule.forFeature([User, Category, WebStack]);

// 申明为全局模型
@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://w3ctim.com:27017/webstack', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
