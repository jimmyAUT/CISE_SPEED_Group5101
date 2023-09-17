import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SearchModule } from './search/search.module';
import * as dotenv from 'dotenv';

dotenv.config();
const mongoDB = process.env.mongoDB;

@Module({
  imports: [
    ArticlesModule,
    MongooseModule.forRoot(mongoDB),
    AuthModule,
    UserModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
