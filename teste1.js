//1.Inicialização
import sleep from 'k6';

//2.Configuração
export const options = {
    vus: 1,
    duration: '10s'
}

//3.Execução //Códdigo vu
export default function(){
    console.log("Testando o k6");
    sleep(1);
}

//4.Desmontagem
export function teardown(data){
    console.log(data)
}