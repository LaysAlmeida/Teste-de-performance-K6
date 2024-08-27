import http from "k6/http";
import { check, group } from "k6";

export const options = {
    vus: 4,
    duration: '5s',
    tags: {
        name:'todo-o-teste'
    },
    thresholds:{
        'http_req_duration{tipo:pi-3-14}': ['p(95) < 500']
    }
}

export default function(){
  group('requisição que lista pi como 3.14', function(){
    const res = http.get('https://test.k6.io/pi.php?decimals=3', {
        tags:{
            tipo: "pi-3-14"
        }
    })
        
    check(res, {
      'status code é 200': (r) => r.status === 200
    });
  })

  group('requisição que lista pi com 4 casas decimais', ()=>{
    const res = http.get('https://test.k6.io/pi.php?decimals=4')
    check(res, {
        'status code é 200': (r) => r.status === 200
    })
  })
  
  
}