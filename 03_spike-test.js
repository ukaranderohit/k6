import http from 'k6/http';
import {sleep} from 'k6';


export const options = {
    stages: [
        { duration: '2m', target: 100 },
        { duration: '60s', target: 0 }
    ]
}

export default function()
{
    http.get('https://test.k6.io');
    sleep(1);
}

