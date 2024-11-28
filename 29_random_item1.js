import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

const names = ['John', 'Jane', 'Bert', 'Ed'];

export default function () {
  const randomName = randomItem(names);
  console.log(`Hello, my name is ${randomName}`);
}