import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { RecordsService } from './records.service';

import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateRecordDto,
  CreateRecordResponseDto,
} from './dto/create-record.dto';

@Controller('records')
@ApiTags('Records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Operación exitosa',
    type: CreateRecordResponseDto,
  })
  create(@Body() createRecordDto: CreateRecordDto, @Res() res?: Response) {
    try {
      const result = this.recordsService.create(createRecordDto);
      res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: error });
    }
  }
}
