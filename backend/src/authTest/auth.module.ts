import { User, UserModel } from './../auth/user.model';
import { Module } from '@nestjs/common';
import { AuthTestController } from './authTest.controller';
import { AuthTestService } from './authTest.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserModel }]),
    PassportModule.register({ session: true }),
  ],
  controllers: [AuthTestController],
  providers: [AuthTestService],
})
export class AuthTestModule {}
