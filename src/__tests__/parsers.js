import { parseJson, parseYaml } from '../parsers.js';

const jsonData = `{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}`;

const result = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const yamlData = `
host: 
  "hexlet.io"
timeout: 
  50
proxy: 
  "123.234.53.22"
follow: 
  false
`;

describe('parsers tests', () => {
  test('parse Json', () => {
    expect(parseJson(jsonData)).toEqual(result);
  });

  test('parse Yaml', () => {
    expect(parseYaml(yamlData)).toEqual(result);
  });
});
