import http from 'k6/http';
import {check} from 'k6';

export default function()
{
    const res = http.get('https://test.k6.io');
    // check(true,{
    //     'true is true': (value) => true ===true
    // })

    check(res,{
        'status is 200': r => r.status === 200,
        'Page starts form collection' :(r)=>res.body.includes('Collection of simple web-pages suitable for load testing.')
    })

//     // Collection of simple web-pages suitable for load testing.

//     check(res,{
//         'Page starts form collection' :(r)=>res.body.includes('Collection of simple web-pages suitable for load testing.') === true
//     })
}