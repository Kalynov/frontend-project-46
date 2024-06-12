import {
  ADDED, REMOVED, CHANGED, WITHOUTCHANGE,
} from '../constants.js';

const signs = {
  [ADDED]: 'was added with value:',
  [REMOVED]: 'was removed',
  [CHANGED]: 'was updated. From',
};

const getFullKey = (key, parent) => (parent ? `${parent}.${key}` : `${key}`);

const stringify = (value) => {
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'object') {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (differences, parent) => {
  const result = [];
  differences.forEach((dif) => {
    if (dif.childrens) {
      result.push(plain(dif.childrens, getFullKey(dif.key, parent)));
      return;
    }
    const prev = dif.value0;
    const current = dif.value1;
    switch (dif.state) {
      case ADDED:
        result.push(`Property '${getFullKey(dif.key, parent)}' ${signs[ADDED]} ${stringify(current)}`);
        break;
      case REMOVED:
        result.push(`Property '${getFullKey(dif.key, parent)}' ${signs[REMOVED]}`);
        break;
      case CHANGED:
        result.push(`Property '${getFullKey(dif.key, parent)}' ${signs[CHANGED]} ${stringify(prev)} to ${stringify(current)}`);
        break;
      case WITHOUTCHANGE:
        break;
      default:
        throw new Error('unknown state');
    }
  });
  return result.join('\n');
};

export default plain;
