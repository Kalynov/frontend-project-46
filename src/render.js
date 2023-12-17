import { ADDED, REMOVED, WITHOUTCHANGE } from './constants.js';

const signs = {
  [ADDED]: ' + ',
  [REMOVED]: ' - ',
  [WITHOUTCHANGE]: '   ',
};

const getMargin = (deep = 0) => new Array(deep * 2).fill('   ').join('');

const render = (differences, deep = 0) => {
  const result = differences.map((dif) => {
    if (dif.childrens) {
      return `${getMargin(deep)}   ${signs[dif.state]}${dif.name}: ${render(dif.childrens, deep + 1)}`;
    }
    return `${getMargin(deep)}   ${signs[dif.state]}${dif.name}: ${dif.value}`;
  });
  return `{\n${result.join('\n')}\n${getMargin(deep)}}`;
};

export default render;
