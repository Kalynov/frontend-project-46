import { readFileSync } from 'fs';
import { parseJson, parseYaml } from './parsers.js';
import comparator from './comparator.js';
import { PLAIN, STYLYSH, JSON_ID } from './constants.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';

const output = {
  [STYLYSH]: stylish,
  [PLAIN]: plain,
  [JSON_ID]: (data) => JSON.stringify(data),
};

const gendiff = (filepath1, filepath2, options) => {
  const type = filepath1.split('.').pop();
  let data1; let data2;
  switch (type) {
    case 'json':
      data1 = parseJson(readFileSync(filepath1, 'utf8'));
      data2 = parseJson(readFileSync(filepath2, 'utf8'));
      break;
    case 'yaml':
    case 'yml':
      data1 = parseYaml(readFileSync(filepath1, 'utf8'));
      data2 = parseYaml(readFileSync(filepath2, 'utf8'));
      break;
    default:
      throw new Error('Uncnown extension');
  }
  const differences = comparator(data1, data2);
  return (output[options?.format] || stylish)(differences);
};
export default gendiff;
