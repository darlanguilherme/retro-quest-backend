import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const User = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const jwtService = new JwtService({ secret: 'Ef8403fSW34_$FEW' });

    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) {
      return null;
    }

    try {
      const user = await jwtService.verify(token);
      request.user = user;
      return user;
    } catch (error) {
      return null;
    }
  },
);
