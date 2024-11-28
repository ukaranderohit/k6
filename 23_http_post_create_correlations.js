import http from 'k6/http';
import { check, sleep, group } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<5500'],
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
    
    
  
        http.post('https://test-api.k6.io/user/register/', 
            JSON.stringify(credentials), 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            sleep(2);

    let res = http.post('https://test-api.k6.io/auth/token/login/', 
            JSON.stringify({
                username: credentials.username,
                password:credentials.password
            }), 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
 
    const accessToken = res.json().access;
    console.log(accessToken);



        http.post('https://test-api.k6.io/my/crocodiles/', 
            JSON.stringify(crocreate), 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            });



        http.get('https://test-api.k6.io/my/crocodiles/',
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken
            
                }
            })
   
    
    
}