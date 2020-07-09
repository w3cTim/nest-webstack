// 自定义装饰器

// import { createParamDecorator } from '@nestjs/common';

// export const CurrentUser = createParamDecorator((data, req) => {
//   console.log(req);
//   return req.user;
// });

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
