import http from 'k6/http';
import {sleep} from 'k6';
import {check} from 'k6';

// https://grafana.com/docs/k6/latest/using-k6/metrics/reference/
export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(95)<500', 'max <2000'],
        http_req_duration: ['p(95)<500'],
        http_reqs: ['count>20'], // request counts
        http_reqs: ['rate>2'] //how many request/hits send and received response for the same.

    }
}

export default function()
{
    const res = http.get('https://test.k6.io');
    check(res,{
        'status is 200': r => r.status === 200,
        'Page starts form collection' :(r)=>res.body.includes('Collection of simple web-pages suitable for load testing.')
    })
    sleep(2);


}