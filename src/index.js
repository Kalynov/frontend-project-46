import { readFileSync } from 'fs';
import { parseJson, parseYaml } from './parsers.js';
import comparator from './comparator.js';
import { PLAIN, STYLYSH, JSON_ID } from './constants.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';

const parsers = {
  json: parseJson,
  yaml: parseYaml,
  yml: parseYaml,
};

const output = {
  [STYLYSH]: stylish,
  [PLAIN]: plain,
  [JSON_ID]: (data) => JSON.stringify(data),
};

const gendiff = (filepath1, filepath2, format) => {
  const path1String = filepath1.split('.');
  const path2String = filepath2.split('.');
  const type1 = path1String[path1String.length - 1];
  const type2 = path2String[path1String.length - 1];
  const data1 = parsers[type1](readFileSync(filepath1, 'utf8'));
  const data2 = parsers[type2](readFileSync(filepath2, 'utf8'));
  const differences = comparator(data1, data2);
  return (output[format] || stylish)(differences);
};
export default gendiff;
