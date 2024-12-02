import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';


// https://grafana.com/docs/k6/latest/examples/data-parameterization/#from-a-csv-file

// https://www.papaparse.com/docs#unparse-config-default


const userCredentials = new SharedArray('Users with Credentails', function () {
    return papaparse.parse(open('./users.csv'), {header: true}).data;
    
});

// console.log(userCredentials)

export default function() {

    userCredentials.forEach((item) => console.log(item.username));

}