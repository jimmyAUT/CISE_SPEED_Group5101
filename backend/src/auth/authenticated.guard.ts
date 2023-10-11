import {
  CanActivate,
  ExecutionContext,
  Injectable,
  // UnauthorizedException,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }
}

// export class LocalAuthGuard extends AuthGuard('local') implements CanActivate {
//   constructor() {
//     super();
//   }

//   canActivate(context: ExecutionContext) {
//     // 获取请求对象
//     const request = context.switchToHttp().getRequest();

//     // 在这里执行自定义的身份验证逻辑
//     const isAuthenticated = this.customAuthenticationLogic(request);

//     if (!isAuthenticated) {
//       throw new UnauthorizedException('Authentication failed');
//     }

//     // 如果身份验证通过，则继续执行父类的 canActivate 方法
//     return super.canActivate(context);
//   }

//   async customAuthenticationLogic(request: {
//     headers: { [x: string]: string };
//   }) {
//     // 在这里编写你的自定义身份验证逻辑
//     // 例如，检查请求中的某些头信息或其他条件
//     if (request.headers['custom-auth-header'] === 'authenticated') {
//       return true;
//     } else {
//       return false;
//     }
//   }

//   handleRequest(err: any, user: any) {
//     // 这里可以处理验证后的结果
//     if (err || !user) {
//       throw err || new UnauthorizedException();
//     }
//     return user;
//   }
// }

// =================================

// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

// @Injectable()
// export class LocalAuthGuard implements CanActivate {
//   canActivate(context: ExecutionContext): boolean {
//     // 在这里执行自定义的身份验证逻辑
//     const request = context.switchToHttp().getRequest();

//     // 假设你的用户对象保存在请求中的 user 属性中
//     const user = request.user;

//     // 在这里检查用户是否有权限访问特定页面
//     // 例如，检查用户的角色或权限

//     // 如果允许访问，返回 true，否则返回 false
//     if (user && user.role === 'admin') {
//       return true; // 允许管理员访问
//     } else {
//       return false; // 其他用户禁止访问
//     }
//   }
// }
