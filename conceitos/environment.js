import http from "k6/http";
import { sleep } from "k6";

export const options = {
    vus:2,
    duration:'5s' 
}

export default function (){
    const BASE_URL = __ENV.URL

    sleep(1);

    //rodar k6 run environment.js -e URL=https://test.k6.io/pi.php?decimals=3

}