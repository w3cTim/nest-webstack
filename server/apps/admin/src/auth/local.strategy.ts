import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { compareSync } from 'bcryptjs';
import { BadRequestException } from '@nestjs/common';

export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
  ) {
    // 本地策略 接收的参数
    super({
      usernameField: 'username', // 前端 Body 体 userName 字段名，默认 username
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string) {
    const user = await this.userModel.findOne({ username }).select('+password');

    if (!user || !compareSync(password, user.password)) {
      throw new BadRequestException('用户或密码错误');
    }
    return user;
  }
}
