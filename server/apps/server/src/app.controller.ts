import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectModel } from 'nestjs-typegoose';
import { WebStack } from '@libs/db/models/webstack.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { Category } from '@libs/db/models/category.model';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectModel(WebStack)
    private readonly webStackModel: ReturnModelType<typeof WebStack>,
    @InjectModel(Category)
    private readonly categoryModel: ReturnModelType<typeof Category>,
  ) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get('category')
  async Category() {
    const category = (await this.categoryModel.find().sort('-orderNum')).map(
      v => ({
        label: v.name,
        icon: v.icofont,
      }),
    );
    return category;
  }

  @Get('webstack')
  async WebStack() {
    const webstack = await this.webStackModel
      .find()
      // .select('_id name logo')
      .select('-count') // 排除 count 字段
      .sort('-orderNum');
    return webstack;
  }
}
