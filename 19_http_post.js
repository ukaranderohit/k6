import http from 'k6/http';
import { check } from 'k6';

export default function(){
    const body = JSON.stringify({
        username: 'test_' + Date.now(),
        password: 'test',
        // email: 'demoooo@gmail.com'

    });
    const param = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let res = http.post('https://test-api.k6.io/user/register/', body, param);

    console.log(body);

    console.log(res.body);

    check(res,{
        'User registration is completed sucessfully!!':(r) => r.status === 201
    })
}