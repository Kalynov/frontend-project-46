const comparator = (obj1, obj2) => {
  const result = [];
  const obj1Keys = Object.keys(obj1).toSorted();
  const obj2keys = Object.keys(obj2).toSorted();
  const set = new Set([...obj1Keys, ...obj2keys]);
  set.forEach((key) => {
    const keyIndex = obj2keys.indexOf(key);
    const key2Index = obj1Keys.indexOf(key);
    if (keyIndex === -1) {
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
