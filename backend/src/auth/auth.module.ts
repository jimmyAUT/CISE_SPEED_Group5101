import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModel } from './user.model';
import { PassportModule } from '@nestjs/passport';
// import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserModel }]),
    PassportModule,
    // PassportModule.register({ defaultStrategy: 'local' }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  // exports: [PassportModule],
})
export class AuthModule {}
