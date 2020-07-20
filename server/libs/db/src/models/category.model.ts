import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Category {
  @prop()
  @ApiProperty({ description: '类别名称' })
  name: string;

  @prop()
  @ApiProperty({ description: 'icofoot' })
  icofont: string;

  @prop()
  @ApiProperty({ description: '排序序号，越大越靠前', default: 1 })
  orderNum: number;
}
