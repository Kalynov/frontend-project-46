import {
  ADDED, REMOVED, CHANGED, WITHOUTCHANGE,
} from '../constants.js';

const signs = {
  [ADDED]: 'was added with value:',
  [REMOVED]: 'was removed',
  [CHANGED]: 'was updated. From',
};

const plain = (differences) => {
  const result = [];
  differences.forEach((dif) => {
    if (dif.childrens) {
      result.push(plain(dif.childrens));
      return;
    }
    const prev = typeof dif.value0 === 'object' ? '[complex value]' : dif.value0;
    const current = typeof dif.value1 === 'object' ? '[complex value]' : dif.value1;
    switch (dif.state) {
      case ADDED:
        result.push(`Property ${dif.key} ${signs[ADDED]} ${current}`);
        break;
      case REMOVED:
        result.push(`Property ${dif.key} ${signs[REMOVED]}`);
        break;
      case CHANGED:
        result.push(`Property ${dif.key} ${signs[CHANGED]} ${prev} to ${current}`);
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
