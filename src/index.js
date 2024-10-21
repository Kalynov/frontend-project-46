import { readFileSync } from 'fs';
import parser from './parser.js';
import comparator from './comparator.js';
import formatter from './formatters/index.js';

// не нашел требования в проекте что нужно обязательно использовать библиотеку path.

const gendiff = (filepath1, filepath2, format) => {
  const path1String = filepath1.split('.');
  const path2String = filepath2.split('.');
  const type1 = path1String[path1String.length - 1];
  const type2 = path2String[path1String.length - 1];
  const file1 = readFileSync(filepath1, 'utf8');
  const file2 = readFileSync(filepath2, 'utf8');
  const data1 = parser(file1, type1);
  const data2 = parser(file2, type2);
  const differences = comparator(data1, data2);

  return formatter(differences, format);
};
export default gendiff;
