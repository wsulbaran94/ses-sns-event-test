import * as moment from 'moment';

const PASS = 'PASS';

function spamVirusVerdictValdiation(status: string): boolean {
  return status == PASS ? true : false;
}

function dnsVerdictValidation({
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

function getMonth(date: string): string {
  return moment(date).format('MMMM');
}

function isDeleyed(time: number): boolean {
  return time > 1000 ? true : false;
}

function withoutDomain(email: string): string {
  const result: string[] = email.split('@');
  return result.length ? result[0] : email;
}

export {
  spamVirusVerdictValdiation,
  dnsVerdictValidation,
  getMonth,
  isDeleyed,
  withoutDomain,
};
