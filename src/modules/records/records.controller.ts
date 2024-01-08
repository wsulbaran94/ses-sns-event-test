import { Controller, Post, Body } from '@nestjs/common';
import { RecordsService } from './records.service';
import {
  CreateRecordDto,
  CreateRecordResponseDto,
} from './dto/create-record.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

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
