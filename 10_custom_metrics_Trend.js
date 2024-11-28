import http from 'k6/http';
import {sleep} from 'k6';
import {Counter, Trend} from 'k6/metrics';

// https://grafana.com/docs/k6/latest/using-k6/metrics/reference/
export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
       http_req_duration: ['p(95)<500'],
       response_time_news_page: ['p(95)<300'],
       my_counter: ['count<50']
    }
}

let myCounter = new Counter('my_counter');
let newspageResponseTrend = new Trend('response_time_news_page');


export default function()
{
    let res = http.get('https://test.k6.io');
    myCounter.add(1);
    sleep(1);

    res = http.get('https://test.k6.io/news.php');
    newspageResponseTrend.add(res.timings.duration);
    sleep(1);
}
