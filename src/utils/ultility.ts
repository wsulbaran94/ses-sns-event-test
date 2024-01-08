import * as moment from 'moment';

const PASS = 'PASS';

export function spamVirusVerdictValdiation(status: string): boolean {
  return status == PASS ? true : false;
}

export function dnsVerdictValidation({
  dkimVerdict,
  spamVerdict,
  dmarcVerdict,
}): boolean {
  const resultValidation: boolean =
    dkimVerdict.status == PASS &&
    spamVerdict.status == PASS &&
    dmarcVerdict.status == PASS
      ? true
      : false;
  return resultValidation;
}

export function getMonth(date: string): string {
  return moment(date).format('MMMM');
}

export function isDeleyed(time: number): boolean {
  return time > 1000 ? true : false;
}

export function withoutDomain(email: string): string {
  const result: string[] = email.split('@');
  return result.length ? result[0] : email;
}
