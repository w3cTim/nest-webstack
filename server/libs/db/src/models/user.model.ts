import { prop, modelOptions, DocumentType } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

// bcryptjs 散列 加盐 加密
// https://www.yuque.com/hello-pg8s3/ui9z3s/ay2dgi#c4y9H
import { hashSync } from 'bcryptjs';

export type UserDocument = DocumentType<User>;

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  // ApiProperty 对 Swagger 说明
  @ApiProperty({ description: '用户名', example: 'use1' })
  // 加了 prop() 才是数据库的字段
  @prop()
  username: string;

  @ApiProperty({ description: '密码11', example: 'pas1' })
  @prop({
    select: false, // 默认不显示
    get(val) {
      return val;
    },
    set(val) {
      return val ? hashSync(val) : val;
    },
  })
  password: string;
}
