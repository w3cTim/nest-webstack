import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})

export class WebStack {
  @ApiProperty({ description: '网站名称', example: 'use1' })
  @prop()
  name: string;

  @prop()
  category: number;

  @prop()
  userID: number;

  @prop()
  descript: string;

  @prop()
  logo: string;

  @prop()
  keyword: string;

  @prop()
  url: string;

  @prop()
  count: number;
}
