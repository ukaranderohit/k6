import http from 'k6/http';
import { check, sleep, group } from 'k6';

export const options = {
    // vus: 2,
    // duration: '60s',
    thresholds: {
        http_req_duration: ['p(95)<5500'],
        'http_req_duration{expected_response:true}': ['p(95)<5500'],
        'group_duration{group:::01_Register_User}': ['p(95)<5500'],
        'group_duration{group:::02_Login_User}': ['p(95)<5500'],
        'group_duration{group:::03_Create_Crocodiles_User}': ['p(95)<5500'],
        'group_duration{group:::04_Search_Created_Crocodiles}': ['p(95)<5500'],
    }
}

export default function(){

    const credentials = {
        username: 'test' + Date.now(),
        password: 'secrets' + Date.now(),
        
    }
    const crocreate = {
        name: 'croname' + Date.now(),
        sex: 'M',
        date_of_birth: '1900-10-10'
    }

    let accessToken = '';
    let croid = '';
    
    group("01_Register_User",function(){
        const res = http.post('https://test-api.k6.io/user/register/', 
            JSON.stringify(credentials), 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            check(res, {
                'User registered successfully': (r) => r.status === 201,
            });

    });

    // Sleep outside the group to exclude it from group duration
    sleep(2);

    group("02_Login_User",function(){
        const res = http.post('https://test-api.k6.io/auth/token/login/', 
            JSON.stringify({
                username: credentials.username,
                password:credentials.password
            }), 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            check(res, {
                'Login successful': (r) => r.status === 200,
            });
            
 
    accessToken = res.json().access;
    console.log(`Access Token: ${accessToken}`);
    });
    group("03_Create_Crocodiles_User",function(){

        const res = http.post('https://test-api.k6.io/my/crocodiles/', 
            JSON.stringify(crocreate), 
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            check(res, {
                'Crocodile created successfully': (r) => r.status === 201,
            });
            croid = res.json().id;
            console.log(`Crocodiles ID: ${croid}`);
    });


    group("04_Search_Created_Crocodiles",function(){
        const res = http.get(`https://test-api.k6.io/my/crocodiles/${croid}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
            
                }
            });
            check(res, {
                'Fetched crocodiles successfully': (r) => r.status === 200,
                'crocodiles ID ': (r) => r.json().id === croid
            });
    });   
}