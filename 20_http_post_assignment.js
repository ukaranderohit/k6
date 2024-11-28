import http from 'k6/http';
import { check } from 'k6';

export default function(){
    // const body = JSON.stringify({
    //     username: 'test143',
    //     password: 'test',
    //     // email: 'demoooo@gmail.com'

    // });
    // const param = {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }

    // let res = http.post('https://test-api.k6.io/auth/token/login/', body, param);
    let res = http.post('https://test-api.k6.io/auth/token/login/', JSON.stringify({
        username: 'test143',
        password: 'test',
        // email: 'demoooo@gmail.com'

    }), {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const accessToken = res.json().access;

    console.log(accessToken);

}