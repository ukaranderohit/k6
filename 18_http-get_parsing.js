import http from 'k6/http';
import {check} from 'k6';


// earlier we are getting the 'crocodiles is Curious George': (r) =>r.body.includes('Curious George') this condition passed as its included,
//but now on above code you are validating its failing because we are exactly validating the json.name and checking this name.
// with below code as
// 'crocodiles is Curious George': (r) =>r.json().name ==='Curious George'


export default function(){
    let res = http.get('https://test-api.k6.io/public/crocodiles/');

    const crocodiles = res.json();
    const crocodilesID = crocodiles[7].id;
    const crocodilesName = crocodiles[7].name;
    // console.log(crocodilesName);

    // const crocodileID = 8;

    // res = http.get('https://test-api.k6.io/public/crocodiles/' + crocodileID );

    res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodilesID}`); // Use backticks for template strings

    // console.log(res.json().name, res.json().sex)
    console.log(res.json().name)
    console.log(res.headers['Content-Type'])

    check(res,{
        'status is 200': (r) => r.status === 200,
        'crocodiles is Curious George': (r) =>r.json().name ==='Curious George'
    })

}
