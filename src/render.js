const render = (differences, deep = 0) => differences.map((dif, i) => {
  const margin = new Array(deep * 2).fill('   ').join('');
  if (Array.isArray(dif)) {
    return render(dif, deep + 1);
  }
  return (deep === 0 && i === differences.length - 1) ? `${margin}${dif}` : `${margin}${dif}
`;
}).join('');

export default render;
