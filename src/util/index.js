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
  return (arr[first].priority < arr[second].priority); 
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

module.exports = {
	less: less,
	swap: swap
}