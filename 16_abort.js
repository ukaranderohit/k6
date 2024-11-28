import http from 'k6/http';
import {sleep} from 'k6';
import exec from 'k6/execution';

export const options = {
    vus: 1,
    duration: '10s'

}

export default function() {
    http.get('https://test.k6.iot');
    sleep(1);
}

export function setup(){
    let res = http.get('https://test.k6.iot');
    if(res.error) {
            exec.test.abort('Aborting Test ...... Application is down');
    }

}