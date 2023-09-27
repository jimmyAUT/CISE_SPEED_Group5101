/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 在此执行身份验证逻辑，例如验证令牌或会话
    // 如果用户已登录，将用户信息存储在 req.user 中
    req.user = { id: '123', role: 'admin' }; // 示例用户信息
    next();
  }
}
