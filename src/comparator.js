function putNewBlock(obj, key, result, comparator) {
  result.push(` + ${key}: {`);
  result.push(comparator(obj[key], obj[key]));
  result.push('   }');
}

const comparator = (obj1, obj2) => {
  const result = [];
  const obj1Keys = Object.keys(obj1).toSorted();
  const obj2keys = Object.keys(obj2).toSorted();
  const set = new Set([...obj1Keys, ...obj2keys]);
  Array.from(set).toSorted().forEach((key) => {
    const keyIndex = obj2keys.indexOf(key);
    const key2Index = obj1Keys.indexOf(key);

    if (obj1[key] instanceof Object || obj2[key] instanceof Object) {
      if (keyIndex !== -1 && key2Index !== -1) {
        if (obj1[key] instanceof Object && !(obj2[key] instanceof Object)) {
          result.push(` - ${key}: {`);
          result.push(comparator(obj1[key], obj1[key]));
          result.push('   }');
          result.push(` + ${key}: ${obj2[key]}`);
        } else if (obj2[key] instanceof Object && !(obj1[key] instanceof Object)) {
          result.push(` - ${key}: ${obj2[key]}`);
          putNewBlock(obj2, key, result, comparator);
        } else {
          result.push(`   ${key}: {`);
          result.push(comparator(obj1[key], obj2[key]));
          result.push('   }');
        }
      } else if (keyIndex === -1) {
        result.push(` - ${key}: {`);
        result.push(comparator(obj1[key], obj1[key]));
        result.push('   }');
      } else if (key2Index === -1) {
        putNewBlock(obj2, key, result, comparator);
      }
    } else if (keyIndex === -1) {
      result.push(` - ${key}: ${obj1[key]}`);
    } else if (key2Index === -1) {
      result.push(` + ${key}: ${obj2[key]}`);
    } else if (obj1Keys[key] === set[key]) {
      if (obj1[key] === obj2[key]) {
        result.push(`   ${key}: ${obj1[key]}`);
      } else {
        result.push(` - ${key}: ${obj1[key]}`);
        result.push(` + ${key}: ${obj2[key]}`);
      }
    }
  });
  return result;
};

export default comparator;
