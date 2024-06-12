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

// const comparator = (obj1, obj2) => {
//   const result = [];
//   const obj1Keys = Object.keys(obj1);
//   const obj2keys = Object.keys(obj2);
//   obj1Keys.forEach((key) => {
//     result.push({
//       name: key,
//       type: obj1[key] instanceof Object ? OBJ : PRIMITIVE,
//       state: REMOVED,
//       value1: obj1[key],
//       childrens: obj1[key] instanceof Object ? comparator(obj1[key], obj1[key]) : undefined,
//     });
//   });

//   obj2keys.forEach((key) => {
//     const keyFromResult = result.find((el) => el.name === key);
//     if (keyFromResult?.type === OBJ) {
//       if (obj2[key] instanceof Object) {
//         keyFromResult.state = WITHOUTCHANGE;
//         keyFromResult.childrens = comparator(obj1[key], obj2[key]);
//       }
//       if (!(obj2[key] instanceof Object)) {
//         keyFromResult.state = CHANGED;
//         result.push({
//           name: key,
//           value: obj2[key],
//           state: ADDED,
//         });
//       }
//     } else if (keyFromResult?.type === PRIMITIVE) {
//       if (obj2[key] instanceof Object) {
//         keyFromResult.state = REMOVED;
//         result.push({
//           name: key,
//           state: ADDED,
//           value: obj2[key],
//           childrens: comparator({}, obj2[key]),
//         });
//       } else if (keyFromResult.value !== obj2[key]) {
//         keyFromResult.state = REMOVED;
//         result.push({
//           name: key,
//           state: ADDED,
//           value: obj2[key],
//         });
//       } else {
//         keyFromResult.state = WITHOUTCHANGE;
//       }
//     } else {
//       result.push({
//         name: key,
//         state: ADDED,
//         value: obj2[key],
//         childrens: obj2[key] instanceof Object ? comparator(obj2[key], obj2[key]) : undefined,
//       });
//     }
//   });
//   return result.sort(compareSorter);
// };

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

    if (obj2[key] instanceof Object && obj1[key] instanceof Object) {
      return ({
        key,
        state: WITHOUTCHANGE,
        value0: obj1[key],
        value1: obj2[key],
        childrens: comparator(obj1[key], obj2[key]),
      });
    }

    if (!(obj2[key] instanceof Object) && obj1[key] instanceof Object) {
      return ({
        key,
        state: CHANGED,
        value0: obj1[key],
        value1: obj2[key],
        // childrens: comparator(obj1[key], obj1[key]),
      });
    }

    if (obj2[key] instanceof Object && !(obj1[key] instanceof Object)) {
      return ({
        key,
        state: CHANGED,
        value0: obj1[key],
        value1: obj2[key],
        // childrens: comparator(obj2[key], obj2[key]),
      });
    }

    if (obj1[key] !== obj2[key]) {
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
    });
  });
  return compareThree.toSorted(compareSorter);
};

export default comparator;
