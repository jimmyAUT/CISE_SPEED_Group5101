import { Module } from '@nestjs/common';
import { RejectedController } from './rejected.controller';
import { RejectedService } from './rejected.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RejectedSchema } from './rejected.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Rejected', schema: RejectedSchema }]),
  ],
  controllers: [RejectedController],
  providers: [RejectedService],
})
export class RejectedModule {}
