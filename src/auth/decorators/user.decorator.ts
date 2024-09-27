import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    if (!req.user) {
      throw new InternalServerErrorException(
        'User not found in request(Auth Guard)',
      );
    }
    return req.user;
  },
);
