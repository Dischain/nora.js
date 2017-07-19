'use strict';

/*            Priority Queue utils section 
***********************************************************/

/**
 * Compares two priority queue items by those priority.
 *
 * @param {Array} arr - an array of items
 * @param {Number} first - array index of fthe irst item to compare
 * @param {Number} second - array index of the second item to compare
 * @returns {Boolean} `true`, if `first` has greater priority, then
 * `second`
 * @public
 */
function less(arr, first, second) {
  return (arr[first].getPriority() < arr[second].getPriority()); 
}

/**
 * Swap two items of `arr` by the given indices
 *
 * @param {Array} arr - an array of items
 * @param {Number} first - array index of fthe irst item to swap
 * @param {Number} second - array index of the second item to swap
 * @public
 */
function swap(arr, first, second) { 
  let temp = arr[first]; 
  arr[first] = arr[second]; 
  arr[second] = temp; 
} 

/*            Common utils section 
***********************************************************/

/**
 * Return a deep copy of the given object.
 *
 * @param {Object} obj
 * @public
 */
function deepCopy(obj) {
  if (Array.isArray(obj)) {
    var copy = [];
    for (let i = 0; i < obj.length; i++) {
      let value = obj[i];
      copy[i] = (value !== null && typeof value === "object") ? 
        deepCopy(value) : value;
    }
  } else {
    var copy = {};

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let value = obj[key];
        copy[key] = (value !== null && typeof value === "object") ? 
          deepCopy(value) : value;
      }
    }
  }
  return copy; 
}

module.exports = {
  less: less,
  swap: swap,
  deepCopy: deepCopy
}