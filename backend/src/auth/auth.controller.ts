import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  // UseGuards,
  Req,
  // Session,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
// import { LocalAuthGuard } from './loaclAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  // @Session()
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: string,
    @Res() res: Response,
  ) {
    try {
      const user = await this.authService.register(email, password, role);
      return res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Registration failed' });
    }
  }

  @Post('login')
  // @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request, @Res() res: Response) {
    const { email, password } = req.body;
    const user = await this.authService.validateUser(email, password);

    if (user) {
      // return res.status(HttpStatus.OK).json({ user });
      res.send(user.role);
    } else {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' });
    }
  }

  // @Post('logout')
  // async logout(@Req() req: Request, @Res() res: Response) {
  //   req.logout(); // 清除会话
  //   return res.status(200).json({ message: 'Logout successful' });
  // }
}
