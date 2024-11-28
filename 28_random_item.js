import http from 'k6/http';
import { check } from 'k6';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

// https://grafana.com/docs/k6/latest/javascript-api/jslib/utils/randomitem/

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/');
    const crocodiles = res.json();
    const crocodileIds = crocodiles.map(item => item.id);
    const crocodileId = randomItem(crocodileIds);
    console.log('Select Corcodile ID is: ' + crocodileId);

    res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileId}/`);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'crocodile has the correct id': (r) => r.json().id === crocodileId
    });
}