import http from 'k6/http';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';


// https://grafana.com/docs/k6/latest/javascript-api/jslib/utils/randomstring/


export const options = {
    vus: 5,
    duration: '5s'
}

export default function () {

    const credentials = {
        username: 'test_' + randomString(5),
        password: 'secret_' + randomString(8),
    }

    console.log(credentials);

    http.post(
        'https://test-api.k6.io/user/register/',
        JSON.stringify(credentials),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
}