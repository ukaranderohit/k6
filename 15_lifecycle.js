import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 1,
    duration: '5s'
}

// Code in the init context prepares the script, loading files, importing modules, and defining the test lifecycle functions. Required.
console.log(' -- init stage --');

// VU code runs in the default or scenario function, running for as long and as many times as the options define. Required.
export default function (data) {
    console.log('-- VU stage --');
    console.log(data);
    sleep(1);
}

// The setup function runs, setting up the test environment and generating data. Optional.
export function setup() {
    console.log('-- setup stage --');
    sleep(10);
    const data = { foo: 'bar' };
    return data;
}

// The teardown function runs, postprocessing data and closing the test environment. Optional.

export function teardown(data) {
    console.log('-- Teardown stage --');
}