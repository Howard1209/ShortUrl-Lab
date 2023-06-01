import http from 'k6/http';
import { check, sleep } from 'k6';
export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      rate: 50,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 200,
      maxVUs: 400,
    },
  },
};
// test HTTP
export default function () {
  const url = 'https://ctceth.com/';
  const payload = { originalUrl: 'https://aws.amazon.com/tw/free/?trk=cf0164b0-a143-4575-9482-010451b8f1d5&sc_channel=ps&ef_id=Cj0KCQjw4NujBhC5ARIsAF4Iv6eWTPUYMGFn8-vuGGSo_246dz_cFvyXOdWWsZbeQzzWUtxsIbpl-cMaAmCpEALw_wcB:G:s&s_kwcid=AL!4422!3!595905315029!e!!g!!aws!17115100998!136234409996&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all'};
  const params = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  };
  const res = http.post(url, payload, params);
  // const res = http.post('http://{your url}/api/1.0/report/payments');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}