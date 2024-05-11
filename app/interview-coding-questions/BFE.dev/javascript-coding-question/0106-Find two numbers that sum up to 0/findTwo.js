export function findTwo(arr) {
  const numberMap = new Map();
  for (let i in arr) {
    numberMap.set(arr[i], i);
  }

  for (let i in arr) {
    if (numberMap.has(-arr[i])) {
      return [i, numberMap.get(-arr[i])];
    }
  }
  return null;
}
