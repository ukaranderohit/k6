import http from 'k6/http';
import {sleep} from 'k6';
import {Counter} from 'k6/metrics';

// https://grafana.com/docs/k6/latest/using-k6/metrics/reference/
export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
       http_req_duration: ['p(95)<500'],
       my_counter: ['count<30']
    }
}

let myCounter = new Counter('my_counter');


export default function()
{
    const res = http.get('https://test.k6.io');
    myCounter.add(1);
    sleep(5);
}