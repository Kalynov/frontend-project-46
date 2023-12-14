const render = (differences, deep = 0) => {
  const result = differences.map((dif, i) => {
    const margin = new Array(deep * 2).fill('   ').join('');
    if (Array.isArray(dif)) {
      return render(dif, deep + 1);
    }
    if (deep === 0 && i === differences.length - 1) {
      return `${margin}${dif}`;
    }
    return `${margin}${dif}
`;
  });
  return result.join('');
};

export default render;
