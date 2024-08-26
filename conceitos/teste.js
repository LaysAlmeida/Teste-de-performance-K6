import http from 'k6/http';
import { check, sleep } from 'k6';
export const options = {
 stages: [
  {duration: '3s', target: 20}, //ramp-up -> quando chegar em 30s, vao ser add 20 usuários
  {duration: '13s', target: 10},//ramp-down -> nos proximos 1m30s depois que passaram os 30s, os usuários vao diminuir de 20-10
  {duration: '2s', target: 0} //ramp-down -> nos proximos 20s a quantidade de usuários vai diminuir até chegar a 0
 ]
};
export default function () {
  const req = http.get('http://test.k6.io');
  check(req,{'status was 200': (r) => r.status == 200})
  sleep(1);
}