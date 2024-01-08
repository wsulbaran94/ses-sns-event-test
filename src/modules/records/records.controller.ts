import { Controller, Post, Body } from '@nestjs/common';
import { RecordsService } from './records.service';

import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateRecordDto,
  CreateRecordResponseDto,
} from '@records/dto/create-record.dto';

@Controller('records')
@ApiTags('Records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Operación exitosa',
    type: CreateRecordResponseDto,
  })
  create(@Body() createRecordDto: CreateRecordDto) {
    return this.recordsService.create(createRecordDto);
  }
}
