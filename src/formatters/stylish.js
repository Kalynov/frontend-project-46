import { ADDED, REMOVED, WITHOUTCHANGE, CHANGED } from '../constants.js';

const signs = {
  [ADDED]: ' + ',
  [REMOVED]: ' - ',
  [WITHOUTCHANGE]: '   ',
};

const getMargin = (deep = 0) => new Array(deep * 2).fill('   ').join('');

const stringify = (value, deep) => {
  if (value instanceof Object) {
    return `{\n${Object.keys(value).map((key) => `   ${getMargin(deep + 1)}   ${key}: ${stringify(value[key], deep + 1)}\n`).join('')}   ${getMargin(deep)}   }`;
  }
  console.log(String(value));
  return String(value);
};

const stylish = (differences, deep = 0) => {
  const result = differences.map((dif) => {
    if (dif.childrens) {
      if (dif.state === CHANGED) {
        return `${getMargin(deep)}   ${signs[REMOVED]}${dif.key}: ${stylish(dif.childrens, deep + 1)}
${getMargin(deep)}   ${signs[ADDED]}${dif.key}: ${stylish(dif.childrens, deep + 1)}`;
      }
      return `${getMargin(deep)}   ${signs[dif.state]}${dif.key}: ${stylish(dif.childrens, deep + 1)}`;
    }
    switch (dif.state) {
      case ADDED: {
        return `${getMargin(deep)}   ${signs[dif.state]}${dif.key}: ${stringify(dif.value1, deep)}`;
      }
      case REMOVED:
      case WITHOUTCHANGE: {
        return `${getMargin(deep)}   ${signs[dif.state]}${dif.key}: ${stringify(dif.value0, deep)}`;
      }
      case CHANGED: {
        return `${getMargin(deep)}   ${signs[REMOVED]}${dif.key}: ${stringify(dif.value0, deep)}
${getMargin(deep)}   ${signs[ADDED]}${dif.key}: ${stringify(dif.value1, deep)}`;
      }
      default:
        return '';
    }
  });
  return `{\n${result.join('\n')}\n${getMargin(deep)}}`;
};

export default stylish;
