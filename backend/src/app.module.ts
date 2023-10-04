import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SearchModule } from './search/search.module';
import { RejectedModule } from './rejected/rejected.module';
import { ReviewModule } from './review/review.module';
import { SubmitModule } from './submit/submit.module';
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
    RejectedModule,
    ReviewModule,
    SubmitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
