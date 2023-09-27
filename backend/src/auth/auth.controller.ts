import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  // UseGuards,
  Req,
  // UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
// import { LocalAuthGuard } from './localAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
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

  // @UseGuards(LocalGuard)
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
}
