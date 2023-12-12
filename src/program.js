import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import comparator from './utils.js';
import { parseJson, parseYaml } from './parsers.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
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
    console.log(`{
  ${differences.map((el, i) => (i !== differences.length - 1
    ? `${el}
  `
    : `${el}`)).join('')}
}`);
  });

export default program;
