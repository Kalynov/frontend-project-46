/**
 *
 * @param {*} obj1 - input object first
 * @param {*} obj2 - input object second
 * @returns - array of objects with info about changes Change[];
 * type Change = {
 *    key: string;
 *    state: 'removed' | 'added' | 'withoutChange' | 'changed';
 *    value0: any;
 *    childrens?: Change[];
 *    value1?: any;
 * }
 */

import {
  ADDED, CHANGED, REMOVED, WITHOUTCHANGE,
} from './constants.js';

const compareSorter = (a, b) => {
  if (a.key < b.key) {
    return -1;
  }
  if (a.key > b.key) {
    return 1;
  }
  return 0;
};

const getStatus = (obj1, obj2, key) => {
  if (!Object.hasOwn(obj1, key)) {
    return ADDED
  }
  if (!Object.hasOwn(obj2, key)) {
    return REMOVED
  }
  if (obj2[key] instanceof Object && obj1[key] instanceof Object) {
    return WITHOUTCHANGE
  }
  if ((!(obj2[key] instanceof Object) && obj1[key] instanceof Object)
    || (obj2[key] instanceof Object && !(obj1[key] instanceof Object))
    || (obj1[key] !== obj2[key])) {
    return CHANGED
  }
  return WITHOUTCHANGE;
}

const comparator = (obj1, obj2) => {
  const keys = new Set(Object.keys(obj1).concat(Object.keys(obj2)));
  const compareThree = Array.from(keys).map((key) => {
    const status = getStatus(obj1, obj2, key);
    switch (status) {
      case ADDED:
        return ({
          key,
          state: status,
          value1: obj2[key],
        });
      case REMOVED:
        return ({
          key,
          state: status,
          value0: obj1[key],
        });
      case CHANGED:
        return ({
          key,
          state: status,
          value0: obj1[key],
          value1: obj2[key],
        });
      case WITHOUTCHANGE:
      default: 
        return ({
          key,
          state: WITHOUTCHANGE,
          value0: obj1[key] ? obj1[key] : obj2[key],
          value1: obj2[key],
          childrens: (obj2[key] instanceof Object && obj1[key] instanceof Object)
            ? comparator(obj1[key], obj2[key])
            : undefined,
        });
    }
  });
  return compareThree.toSorted(compareSorter);
};

export default comparator;
