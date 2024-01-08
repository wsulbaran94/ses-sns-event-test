import { Module } from '@nestjs/common';
import { RecordsController } from '@records/records.controller';
import { RecordsService } from '@records/records.service';
@Module({
  controllers: [RecordsController],
  providers: [RecordsService],
})
export class RecordsModule {}
