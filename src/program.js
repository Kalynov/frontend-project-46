import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import { parseJson, comparator } from './utils.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const data1 = parseJson(readFileSync(filepath1, 'utf8'));
    const data2 = parseJson(readFileSync(filepath2, 'utf8'));
    const differences = comparator(data1, data2);
    console.log(`{
  ${differences.map((el, i) => (i !== differences.length - 1
    ? `${el}
  `
    : `${el}`)).join('')}
}`);
  });

export default program;
