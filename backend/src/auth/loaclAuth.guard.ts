/* eslint-disable prettier/prettier */
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext): boolean {
    // 在这里执行自定义的角色授权逻辑
    const request = context.switchToHttp().getRequest();
    const user = request.user; // 从会话中获取用户对象

    if (user) {
      // 根据用户角色判断是否允许访问特定页面
      if (user.role === 'administrator' && request.url.includes('/admin')) {
        return true;
      }
      if (
        (user.role === 'administrator' || user.role === 'moderator') &&
        request.url.includes('/review')
      ) {
        return true;
      }
      if (
        (user.role === 'administrator' || user.role === 'analyst') &&
        request.url.includes('/analyst')
      ) {
        return true;
      }
      // 所有用户都允许访问 submitter 页面
      if (request.url.includes('/submitter')) {
        return true;
      }
    }

    return false;
  }
}
