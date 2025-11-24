export const filterDuplicatedObjectByKey = (arr: any[], key: string) => {
  const seen = new Set();

  return arr.filter((e) => {
    if (seen.has(e[key])) {
      return false;
    } else {
      seen.add(e[key]);
      return true;
    }
  });
};
