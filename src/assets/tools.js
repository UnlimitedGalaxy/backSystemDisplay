/**
 *  [判断值是否为空包括检测对象或数组的值是否为空]
 * @param {any}  [任何值]
 * @return {boolean}  [true判断为空，false判断不为空]
 */
function checkNull(val) {
  let innerVal = val;
  if (typeof val === 'string') {
    innerVal = innerVal.trim();
  }
  if (!innerVal && innerVal !== 0) {
    return true;
  }
  if (typeof innerVal === 'object' &&
    Object.prototype.toString.call(innerVal) !== '[object Date]') {
    const keys = Object.keys(innerVal);
    if (keys.length > 0) {
      if (keys.every(item => checkNull(innerVal[item]))) {
        return true;
      }
      return false;
    }
    return true;
  }
  return false;
}
/**
 *  [按给定大小分割数组]
 * @param {Array|String} arr [分割对象]
 * @param {Number} size [分割大小]
 * @return {Array}  finalArr [返回分割后的数组]
 */
const splitArr = (arr, size) => {
  const finalSize = Math.abs(Math.floor(size * 1) || 1);
  const length = arr.length;
  if (!length) {
    return [];
  }
  const finalArr = [];
  for (let i = 0; i < length;) {
    finalArr.push(arr.slice(i, i += finalSize));
  }
  return finalArr;
};
