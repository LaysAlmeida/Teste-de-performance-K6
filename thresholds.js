import http from "k6/http";
import { check } from "k6";
import { Counter } from "k6/metrics";
import { Gauge } from "k6/metrics";
import { Rate } from "k6/metrics";
import { Trend } from "k6/metrics";

export const options = {
    vus: 1,
    duration: '30s',
    thresholds: {
        http_req_failed: ['rate < 0.01'], // a taxa de falhas definidas nesse limite deve ser menor que 1%
        http_req_duration: [{threshold: 'p(95) < 500', abortOnFail: true, delayAbortEval: '10s'}], //Duração da requisição, 95% da requisições deve ser menor que 200ms, p é percentil
        // com o abortOnFail: true, a execução é interompida caso não atinja o previsto nos limites
       // o delayAbortEval: '10s' adiciona um delay de 10s para que o teste não seja abortado instantaneamente
        checks: ['rate > 0.9'] // A taxa de verificação bem-sucedida deve ser superior a 90%
    }
}

const chamadas = new Counter('quantidade_de_chamadas');
const myGauge = new Gauge('tempo_bloqueado');
const myRate = new Rate('taxa_req_200'); 
const myTrend = new Trend('taxa_de_espera');

export default function () {
    const req = http.get('http://test.k6.io/');
    check(req, {
        'status code é 200': (r) => r.status === 200
      });
    chamadas.add(1);
    myGauge.add(req.timings.blocked);
    myRate.add(req.status === 200);
    myTrend.add(req.timings.waiting);
}