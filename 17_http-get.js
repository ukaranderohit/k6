import http from 'k6/http';
import {check} from 'k6';

export default function(){
    let res = http.get('https://test-api.k6.io/public/crocodiles/');

    res = http.get('https://test-api.k6.io/public/crocodiles/8');

  
    check(res,{
        'status is 200': (r) => r.status === 200,
        'crocodiles is Curious George': (r) =>r.body.includes('Curious George')
    })

}


// how to debug the http request with runing command into terminal
// k6 run --http-debug .\17_http-get.js