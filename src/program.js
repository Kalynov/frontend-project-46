import { Command } from 'commander';
import { STYLYSH } from './constants.js';
import gendiff from './index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', STYLYSH)
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((...params) => console.log(gendiff(...params)));

export default program;
