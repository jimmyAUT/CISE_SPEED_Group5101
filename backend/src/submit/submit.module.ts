import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { submitSchema } from './submit.schema';
import { SubmitService } from './submit.service';
import { SubmitController } from './submit.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Submit', schema: submitSchema }]),
  ],
  providers: [SubmitService],
  controllers: [SubmitController],
})
@Module({})
export class SubmitModule {}
