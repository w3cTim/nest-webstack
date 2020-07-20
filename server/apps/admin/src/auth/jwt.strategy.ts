import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { UnauthorizedException } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
  ) {
    super({
      // 获取从哪获取 Token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      // 是否忽略过期 默认
      // ignoreExpiration: false,
    } as StrategyOptions);
  }

  async validate(token) {
    // console.log(token);
    const entity = await this.userModel.findById(token.id);

    if (!entity) {
      throw new UnauthorizedException('没找到用户。');
    }

    return entity;
  }
}
