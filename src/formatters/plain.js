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
  const result = differences.map((dif) => {
    if (dif.childrens) {
      return (plain(dif.childrens, getFullKey(dif.key, parent)));
    }
    const prev = dif.value0;
    const current = dif.value1;
    switch (dif.state) {
      case ADDED:
        return (`Property '${getFullKey(dif.key, parent)}' ${signs[ADDED]} ${stringify(current)}`);
      case REMOVED:
        return (`Property '${getFullKey(dif.key, parent)}' ${signs[REMOVED]}`);
      case CHANGED:
        return (`Property '${getFullKey(dif.key, parent)}' ${signs[CHANGED]} ${stringify(prev)} to ${stringify(current)}`);
      case WITHOUTCHANGE:
        return '';
      default:
        throw new Error('unknown state');
    }
  });
  return result.filter((el) => el !== '').join('\n');
};

export default plain;
