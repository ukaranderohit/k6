import http from 'k6/http';

export default function()
{
    const res = http.get('https://test.k6.io');
    // console.log(res.headers);
    // console.log(res.body);
    console.log(res.status);
    
}