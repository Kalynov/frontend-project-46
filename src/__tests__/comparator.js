import { comparator } from '../utils.js';

const obj1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const obj2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

const result = [
  ' - follow: false',
  '   host: hexlet.io',
  ' - proxy: 123.234.53.22',
  ' - timeout: 50',
  ' + timeout: 20',
  ' + verbose: true',
];

describe('comparator test', () => {
  test('simple objects compaarator', () => {
    expect(comparator(obj1, obj2)).toEqual(result);
  });
});
