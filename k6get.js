import http from 'k6/http';
import { check, sleep } from 'k6';
export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      rate: 100,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 500,
      maxVUs: 1000,
    },
  },
};
// test HTTP
export default function ()  {
  const res = http.get('http://ctceth.com/uH8F31');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}