import http from "k6/http";
import { check, group } from "k6";
import { Counter } from "k6/metrics";
import { Rate } from "k6/metrics";

export const options = {
    vus: 4,
    duration: '5s',
    thresholds: {
      'http_req_duration{group:::requisição que lista pi como 3.14}': ['p(95) < 500']
    }
}
const myRate = new Rate('taxa_req_200_pi_3_14')
const chamadas1 = new Counter('quantidade_de_chamadas_pi_3_14');
const chamadas2 = new Counter('quantidade_de_chamadas_4_casas');

export default function(){
  group('requisição que lista pi como 3.14', function(){
    const res = http.get('https://test.k6.io/pi.php?decimals=3')
    check(res, {
      'status code é 200': (r) => r.status === 200
    });
    chamadas1.add(1)
    myRate.add(res.status === 200)
  })

  group('requisição que lista pi com 4 casas decimais', ()=>{
    const res = http.get('https://test.k6.io/pi.php?decimals=4')
    check(res, {
        'status code é 200': (r) => r.status === 200
    })
    chamadas2.add(1)
  })
  
  
}