import http from 'k6/http';

export default function(){

    console.log("Test started");
    console.log(__ENV.BASE_URL);

    http.get(`${__ENV.BASE_URL}/public/crocodiles/`);

    // run script with below command
    // k6 run --env BASE_URL=https://test-api.k6.io .\25_env_variable.js
}