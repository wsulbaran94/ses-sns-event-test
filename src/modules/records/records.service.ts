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
} from '@utils/ultility';

@Injectable()
export class RecordsService {
  create(createRecordDto: CreateRecordDto) {
    const record: CreateRecordDto = createRecordDto;

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

// {
//   "spam": "spamVerdic a boolean, PASS = true",
//   "virus": "virusVerdic a boolean, PASS = true",
//   "dns": "spfVerdic, dkimVeredict, dmarcVeredict a boolean, si todos PASS = true",
//   "mes": "mail.timestamp a mes como texto",
//   "retrasado": "processingTimeMillis a boolean, > 1000 = true"
//   "emisor": "mail.source a usuario de correo sin @dominio.com",
//   "receptor": ["mail.destination a usuarios de correo sin @domino.com"]
// }
