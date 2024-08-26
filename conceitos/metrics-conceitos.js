import http from "k6/http";
import { Counter } from "k6/metrics";
import { Gauge } from "k6/metrics";
import { Rate } from "k6/metrics";
import { Trend } from "k6/metrics";

export const options = {
    vus: 1,
    duration: '3s'
}

const chamadas = new Counter('quantidade_de_chamadas');
const myGauge = new Gauge('tempo_bloqueado');
const myRate = new Rate('taxa_req_200'); //Taxa de quatas requisições tiveram o status code 200
const myTrend = new Trend('taxa_de_espera')

    ;
export default function () {
    const req = http.get('http://test.k6.io/');
    //contador
    chamadas.add(1);
    //medidor
    myGauge.add(req.timings.blocked);
    //taxa
    myRate.add(req.status === 200);
    //tendencia
    myTrend.add(req.timings.waiting); //Tempo em que a requisição ficou esperando para ser realizada
}