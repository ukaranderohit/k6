import http from 'k6/http';


// https://grafana.com/docs/k6/latest/using-k6/tags-and-groups/

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<500'],
        'http_req_duration{status:200}' : ['p(95)<500'],
        'http_req_duration{status:201}' : ['p(95)<500'],

    }
}

export default function(){
    http.get('https://run.mocky.io/v3/d41c2f34-fb30-423e-acc0-8f89e85fe056');
    http.get('https://run.mocky.io/v3/4a86d5e9-40a5-4a52-83ad-f884ab400a89/?mocky-delay=2000ms');

}