import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
  schemaOptions: {
    timestamps:true
  }
})

export class User {
  // ApiProperty 对 Swagger 说明
  @ApiProperty({ description: '用户名', example: 'use1' })
  // 加了 prop() 才是数据库的字段
  @prop()
  username: string;

  @ApiProperty({ description: '密码11' ,example:'pas1'})
  @prop()
  password: string;
}
