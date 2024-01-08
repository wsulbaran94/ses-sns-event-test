import { Injectable } from '@nestjs/common';
import {
  CreateRecordDto,
  CreateRecordResponseDto,
} from '@records/dto/create-record.dto';
import {
  dnsVerdictValidation,
  getMonth,
  isDeleyed,
  spamVirusVerdictValdiation,
  withoutDomain,
} from '../../utils/record.util';

@Injectable()
export class RecordsService {
  create(createRecordDto: CreateRecordDto) {
    const record: CreateRecordDto = createRecordDto;
    if (!record.Records || !record.Records.length) {
      throw 'Records can not be empty!!!';
    }
    const newRecord: CreateRecordResponseDto[] = record.Records.map((value) => {
      const newItem: CreateRecordResponseDto = {
        spam: false,
        virus: false,
        dns: false,
        retrasado: false,
        mes: '',
        emisor: '',
        receptor: [],
      };
      const { mail, receipt } = value.ses;
      const { spamVerdict, virusVerdict } = receipt;

      newItem.dns = dnsVerdictValidation(receipt);

      newItem.spam = spamVirusVerdictValdiation(spamVerdict.status);

      newItem.virus = spamVirusVerdictValdiation(virusVerdict.status);

      newItem.mes = getMonth(mail.timestamp);

      newItem.retrasado = isDeleyed(receipt.processingTimeMillis);

      newItem.emisor = withoutDomain(mail.source);
      newItem.receptor = mail.destination.map((email) => withoutDomain(email));

      return newItem;
    });
    return newRecord;
  }
}
