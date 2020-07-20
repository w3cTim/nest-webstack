import { prop, modelOptions, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from './category.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class WebStack {
  @ApiProperty({ description: '网站名称', example: 'www.baidu.com' })
  @prop()
  name: string;

  @ApiProperty({ description: '网站分类' })
  // @prop({ ref: 'Category' })
  @prop()
  category: string; //Ref<Category>;

  @prop()
  @ApiProperty({ description: '归属用户' })
  userID: number;

  @prop()
  @ApiProperty({ description: '描述' })
  descript: string;

  @prop()
  @ApiProperty({ description: 'logo' })
  logo: string;

  @prop()
  @ApiProperty({ description: '关键字' })
  keyword: string;

  @prop()
  @ApiProperty({ description: '网址' })
  url: string;

  @prop()
  @ApiProperty({ description: '访问次数', default: 0 })
  count: number;

  @prop()
  @ApiProperty({ description: '排序序号，越大越靠前', default: 1 })
  orderNum: number;
}
