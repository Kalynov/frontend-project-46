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

const comparator = (obj1, obj2) => {
  const keys = new Set(Object.keys(obj1).concat(Object.keys(obj2)));
  const compareThree = Array.from(keys).map((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return ({
        key,
        state: ADDED,
        value1: obj2[key],
      });
    }
    if (!Object.hasOwn(obj2, key)) {
      return ({
        key,
        state: REMOVED,
        value0: obj1[key],
      });
    }
    if ((!(obj2[key] instanceof Object) && obj1[key] instanceof Object)
      || (obj2[key] instanceof Object && !(obj1[key] instanceof Object))
      || (obj1[key] !== obj2[key])) {
      return ({
        key,
        state: CHANGED,
        value0: obj1[key],
        value1: obj2[key],
      });
    }
    return ({
      key,
      state: WITHOUTCHANGE,
      value0: obj2[key],
      value1: obj2[key],
      childrens: (obj2[key] instanceof Object && obj1[key] instanceof Object)
        ? comparator(obj1[key], obj2[key])
        : undefined,
    });
  });
  return compareThree.toSorted(compareSorter);
};

export default comparator;
