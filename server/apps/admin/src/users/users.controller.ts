import { Controller, Get, UseGuards } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Crud({
  model: User,
})
@Controller('users')
@ApiTags('用户')
export class UsersController {
  // 注入数据模型
  constructor(@InjectModel(User) private readonly model) {}

  @Get('option')
  option() {
    return {
      title: '用户管理',
      column: [{ prop: 'username', label: '用户名' }],
    };
  }
}
