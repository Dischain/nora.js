'use strict';

const less = require('../util').less, 
      swap = require('../util').swap;

/**
 * Priority Queue constructor, implemented on simple js arrays. 
 * Items placing at private `_items` fiels, which starts from
 * [0] element and childred of the n-th item are located at
 * the `[2n + 1]` and `[2n + 2]` index. 
 * Each `item` at the `_items` array should contain `priority`
 * field in order to implement `PrioritizedTask` interface.
 * `PQ` contains the only one public method - `next()`, which
 * returns the most prioritized item from collection.
 *
 * @param {Array} items - an array of tasks, which is not 
 * required. The set of tasks may be provided from the js
 * `arguments` object.
 */
function PQ(items) { 
  this._items = [];

  let data;
  if (!Array.isArray(items)) {
    data = Array.prototype.slice.call(arguments);
  } else {
    // Do not modify initial array of items
    data = Array.prototype.slice.call(items);
  }

  data.forEach((item, index) => { 
    this._items.push(item);
    this._up(index); 
  }); 

  this._length = this._items.length;
} 
 
PQ.prototype._up = function(index) { 
  while (index > 0 && 
         less(this._items, Math.ceil(index / 2) - 1, index)) { 
    swap(this._items, Math.ceil(index / 2) - 1, index); 
    index = Math.ceil(index / 2) - 1; 
  } 
} 

PQ.prototype._down = function(curIdx) { 
  while (curIdx * 2 + 1 < this._length) {
    let curChildIdx = curIdx * 2 + 1;

    if (curChildIdx < this._length - 1 && 
        less(this._items, curChildIdx, curChildIdx + 1)) {
      curChildIdx++; 
    }

    if (!less(this._items, curIdx, curChildIdx)) {
      break;
    }

    swap(this._items, curIdx, curChildIdx);
    curIdx = curChildIdx;
  }
}

/** 
 * Returns `null` if container is empty
 */ 
PQ.prototype._pop = function() { 
  if (this._length === 0) 
    return null; 
 
  let top = this._items[0]; 
  swap(this._items, 0, --this._length);
 
  this._items.pop(); 

  this._down(0); 
 
  return top; 
} 

/*                       Public section 
***********************************************************/

/**
 * Returns and delete the most prioritized item. If inner
 * `_items` array is empty, returns null.
 *
 * @returns {Object} top prioritized item
 * @public
 */
PQ.prototype.next = function() {
  return this._pop();
}

module.exports = PQ;