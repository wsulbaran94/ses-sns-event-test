import { ApiProperty } from '@nestjs/swagger';

class statusDto {
  @ApiProperty()
  status: string;
}

class ReceiptDto {
  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  processingTimeMillis: number;

  @ApiProperty()
  recipients: string[];

  @ApiProperty({ type: statusDto })
  spamVerdict: statusDto;

  @ApiProperty({ type: statusDto })
  virusVerdict: statusDto;

  @ApiProperty({ type: statusDto })
  spfVerdict: statusDto;

  @ApiProperty({ type: statusDto })
  dkimVerdict: statusDto;

  @ApiProperty({ type: statusDto })
  dmarcVerdict: statusDto;

  @ApiProperty()
  dmarcPolicy: string;

  @ApiProperty()
  action: {
    type: string;
    topicArn: string;
  };
}

class MailDto {
  @ApiProperty()
  timestamp: string;
  @ApiProperty()
  source: string;
  @ApiProperty()
  messageId: string;
  @ApiProperty()
  destination: string[];
  @ApiProperty()
  headersTruncated: boolean;
  @ApiProperty()
  headers: {
    name: string;
    value: string;
  }[];
  @ApiProperty()
  commonHeaders: {
    returnPath: string;
    from: string[];
    date: string;
    to: string[];
    messageId: string;
    subject: string;
  };
}

class ReceiptMailDto {
  @ApiProperty({ type: ReceiptDto })
  receipt: ReceiptDto;
  @ApiProperty({ type: MailDto })
  mail: MailDto;
}

class RecordsDto {
  @ApiProperty()
  eventVersion: string;

  @ApiProperty({ type: ReceiptMailDto })
  ses: ReceiptMailDto;

  @ApiProperty()
  eventSource: string;
}

export class CreateRecordDto {
  @ApiProperty({ isArray: true, type: RecordsDto })
  Records: RecordsDto[];
}

export class CreateRecordResponseDto {
  @ApiProperty()
  spam: boolean;

  @ApiProperty()
  virus: boolean;

  @ApiProperty()
  dns: boolean;

  @ApiProperty()
  mes: string;

  @ApiProperty()
  retrasado: boolean;

  @ApiProperty()
  emisor: string;

  @ApiProperty()
  receptor: string[];
}
