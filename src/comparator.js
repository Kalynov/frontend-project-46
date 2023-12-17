/**
 *
 * @param {*} obj1 - input object first
 * @param {*} obj2 - input object second
 * @returns - array of objects with info about changes Change[];
 * type Change = {
 *    name: string;
 *    state: 'removed' | 'added' | 'withoutChange';
 *    value: any;
 *    childrens?: Change[];
 *    type: 'obj' | 'primitive'
 * }
 */

import {
  ADDED, OBJ, PRIMITIVE, REMOVED, WITHOUTCHANGE,
} from './constants.js';

const compareSorter = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

const comparator = (obj1, obj2) => {
  const result = [];
  const obj1Keys = Object.keys(obj1);
  const obj2keys = Object.keys(obj2);
  obj1Keys.forEach((key) => {
    result.push({
      name: key,
      type: obj1[key] instanceof Object ? OBJ : PRIMITIVE,
      state: REMOVED,
      value: obj1[key],
      childrens: obj1[key] instanceof Object ? comparator(obj1[key], obj1[key]) : undefined,
    });
  });

  obj2keys.forEach((key) => {
    const keyFromResult = result.find((el) => el.name === key);
    if (keyFromResult?.type === OBJ) {
      if (obj2[key] instanceof Object) {
        keyFromResult.state = WITHOUTCHANGE;
        keyFromResult.childrens = comparator(obj1[key], obj2[key]);
      }
      if (!(obj2[key] instanceof Object)) {
        result.push({
          name: key,
          value: obj2[key],
          state: ADDED,
        });
      }
    } else if (keyFromResult?.type === PRIMITIVE) {
      if (obj2[key] instanceof Object) {
        keyFromResult.state = REMOVED;
        result.push({
          name: key,
          state: ADDED,
          value: obj2[key],
          childrens: comparator({}, obj2[key]),
        });
      } else if (keyFromResult.value !== obj2[key]) {
        keyFromResult.state = REMOVED;
        result.push({
          name: key,
          state: ADDED,
          value: obj2[key],
        });
      } else {
        keyFromResult.state = WITHOUTCHANGE;
      }
    } else {
      result.push({
        name: key,
        state: ADDED,
        value: obj2[key],
        childrens: obj2[key] instanceof Object ? comparator(obj2[key], obj2[key]) : undefined,
      });
    }
  });
  //console.log(JSON.stringify(result.sort(compareSorter)));
  return result.sort(compareSorter);
};

export default comparator;
