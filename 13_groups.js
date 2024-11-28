import http from 'k6/http';
import { sleep, check, group } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<550'],
        'group_duration{group:::01_Main Page}': ['p(95)<2500'],
        'group_duration{group:::02_News page}': ['p(95)<2500'],
        'group_duration{group:::01_Main Page::01_01_Assets}': ['p(95)<2500'],
    }
}

export default function () {

    group('01_Main Page', function(){
        let res = http.get('https://test.k6.io/');
        check(res, { 'status is 200': (r) => r.status === 200 });
    
        group('01_01_Assets', function () {
            http.get('https://test.k6.io/static/css/site.css');
            http.get('https://test.k6.io/static/js/prisms.js');
        });
    });


    group('02_News page', function () {
        http.get('https://test.k6.io/news.php');
    });

    sleep(1);
}
