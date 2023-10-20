import { Body, Controller, Get, Post, Session } from '@nestjs/common';
//   import { Request } from 'express';
import { AuthTestService } from './authTest.service';
import { UserDto } from 'src/user/user.dto';
import { User } from 'src/auth/user.model';

@Controller('authTest')
export class AuthTestController {
  constructor(private readonly authTestService: AuthTestService) {}

  @Get()
  findSession(@Session() session: Record<string, any>) {
    session.role = 'admin';
    session.email = 'a@mail.com';
    session.visits = session.visits ? session.visits + 1 : 1;
    const session_value = {
      visits: session.visits,
      email: session.email,
      role: session.role,
    };
    return session_value;
  }

  @Post('login')
  async login(
    @Body() userDto: UserDto,
    @Session() session: Record<string, any>,
  ): Promise<User | null> {
    const { email, password } = userDto;
    const user = await this.authTestService.validateUser(email, password);

    if (user) {
      session.user = { email: user.email, role: user.role };
      return user;
    } else {
      return null;
    }
  }
}
